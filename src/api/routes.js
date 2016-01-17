/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import express from 'express';
import twitterHandler from './dataHandler/tw';

const router = new express.Router();


router.get('/social/twdata', async(req, res, next) => {
  try {
    const data = await twitterHandler.findAll();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/social/twdata/:range', async(req, res, next) => {
  try {
    const range = req.params.range.split(',');
    const data = await twitterHandler.findByDate(range[0], range[1]);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
