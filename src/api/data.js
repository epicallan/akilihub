/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { Router } from 'express';
import controller from '../controllers/analysisController.js';

const router = new Router();

router.get('/social/hello', async(req, res, next) => {
  try {
    const data = controller.getPostSentiments();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
