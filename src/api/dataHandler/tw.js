/**
 * Gets data from Twitter model
 */
import mongodb from 'mongodb';
import { MONGO_URL } from '../../config';
import redis from 'redis';
const client = redis.createClient();

const MongoClient = mongodb.MongoClient;
const collection = 'twits';
const hour = 60000 * 60;

function _connection() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
      resolve(db);
      reject(err);
    });
  });
}

function getFromRedis() {
  return new Promise((resolve, reject) => {
    client.get('tw', (err, reply) => {
      resolve(reply);
      reject(err);
    });
  });
}

async function findAll() {
  try {
    const db = await _connection();
    const now = new Date();
    const hoursPast = now.getHours();
    const time = now - (hour * hoursPast * 2);
    return db.collection(collection).find({
      'is_retweet': false,
      timeStamp: { $gt: time },
    }).sort({ timeStamp: 1 })
    .toArray();
  } catch (e) {
    throw new Error(e);
  }
}

async function findByDate(start) {
  try {
    const db = await _connection();
    const end = parseInt(start, 10) + hour * 6;
    return db.collection(collection).find({
      timeStamp: {
        $gt: parseInt(start, 10),
        $lt: end,
      },
      is_retweet: false,
    }, {}).sort({ timeStamp: 1 })
    .toArray();
  } catch (e) {
    throw new Error(e);
  }
}

export default { findAll, findByDate, getFromRedis };
