/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import express from 'express';
import twitterHandler from './dataHandler/tw';

const router = new express.Router();

router.get('/social/twdata', async(req, res, next) => {
  try {
    const data = await twitterHandler.findAll();
    const aggregate = await twitterHandler.getFromRedis();
    // console.log(aggregate);
    res.status(200).json({ data, aggregate: JSON.parse(aggregate) });
  } catch (err) {
    next(err);
  }
});

router.get('/social/twdata/:date', async(req, res, next) => {
  try {
    const data = await twitterHandler.findByDate(req.params.date);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
