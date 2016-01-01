/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import express from 'express';
import Controller from './controllers/analysisController.js';
import path from 'path';

const router = new express.Router();

const controller = new Controller({
  file: path.resolve(__dirname, 'content/tw-museveni.json'),
  type: 'twitter',
});

router.get('/social/twdata', async(req, res, next) => {
  try {
    const data = controller.getSentimatedData();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
