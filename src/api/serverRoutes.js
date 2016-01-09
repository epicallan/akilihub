/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import express from 'express';
import Controller from './controllers/analysisController.js';
import path from 'path';

const router = new express.Router();

const controller = new Controller({
  file: path.resolve(__dirname, 'content/data.json'),
  type: 'twitter',
});

router.get('/social/twdata', async(req, res, next) => {
  try {
    controller.getSentimatedData('sentimated', (data) => {
      res.status(200).json(data);
    });
  } catch (err) {
    next(err);
  }
});
// improvise to be added to a background task runner
router.get('/social/save', async(req, res, next) => {
  try {
    controller.cacheSentimatedData((reply) => {
      res.status(200).send(reply);
    });
  } catch (err) {
    next(err);
  }
});

export default router;
