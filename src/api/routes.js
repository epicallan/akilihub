import express from 'express';
import * as twitters from './controllers/twitters';
import * as inquiries from './controllers/inquiries';
const router = new express.Router();

router.get('/social/twdata/all', async(req, res, next) => {
  try {
    const raw = await twitters.findData(req.query.start, req.query.end);
    const data = twitters.transform(raw);
    const aggregate = await twitters.getFromRedis();
    res.status(200).json({ data, aggregate: JSON.parse(aggregate) });
  } catch (err) {
    next(err);
  }
});

router.get('/social/twdata', async(req, res, next) => {
  try {
    const raw = await twitters.findData(req.query.start, req.query.end);
    const data = twitters.transform(raw);
    console.log(`data count is ${data.length}`);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/inquiries', async(req, res, next) => {
  try {
    const payload = Object.assign({}, req.body, { date: new Date() });
    inquiries.saveInquiry(payload, (error) => {
      const code = error ? 500 : 200;
      res.status(code).json({ status: error || 'success' });
    });
  } catch (err) {
    if (err) next(err);
  }
});

router.get('/inquiries', async(req, res, next) => {
  try {
    const data = await inquiries.findInquiries();
    res.status(200).json(data);
  } catch (err) {
    if (err) next(err);
  }
});

router.post('/social/twdata', async(req, res, next) => {
  try {
    // console.log(twitters);
    twitters.saveTweets(req.body, (result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    if (err) next(err);
  }
});
export default router;
