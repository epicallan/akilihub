import express from 'express';
import * as twitterHandler from './dataHandler/tw';
const router = new express.Router();

router.get('/social/twdata/all', async(req, res, next) => {
  try {
    const raw = await twitterHandler.findAll(req.query.start, req.query.end);
    const data = twitterHandler.transform(raw);
    const aggregate = await twitterHandler.getFromRedis();
    res.status(200).json({ data, aggregate: JSON.parse(aggregate) });
  } catch (err) {
    next(err);
  }
});

router.get('/social/twdata/:date', async(req, res, next) => {
  try {
    const raw = await twitterHandler.findByDate(req.params.date);
    const data = twitterHandler.transform(raw);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/social/twdata', async(req, res, next) => {
  try {
    // console.log(twitterHandler);
    twitterHandler.saveTweets(req.body, (result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    if (err) next(err);
  }
});
export default router;
