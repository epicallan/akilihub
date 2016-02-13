import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port, MONGO_URL } from './config';
import compression from 'compression';
import bodyParser from 'body-parser';
import twitterJob from './api/jobs/twitterJob';
import mongoose from 'mongoose';
import cron from 'cron';

const CronJob = cron.CronJob;
const server = global.server = express();


server.use(bodyParser.json());

server.use(compression());
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));

// Register Data analysis API middleware
// -----------------------------------------------------------------------------
server.use('/api', require('./api/routes'));


// Register API middleware

// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));

function connect() {
  const options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(MONGO_URL, options).connection;
}

// cron job
const job = new CronJob({
  cronTime: '00 45 * * * *',
  onTick: () => {
    twitterJob();
  },
  start: true,
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});
//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', () => {
      console.log(`using mongodb ${MONGO_URL}`);
      // initial twitter job to get aggregated data
      twitterJob();
      try {
        job.start();
      } catch (ex) {
        console.log('cron pattern not valid' + ex.toString());
      }
    });
  console.log(`The server is running at http://localhost:${port}/ PID is ${process.pid}`);
});
