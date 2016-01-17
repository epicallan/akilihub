/**
 * Gets data from Twitter model
 */
import mongodb from 'mongodb';
import { MONGO_URL } from '../../config';

const MongoClient = mongodb.MongoClient;
const collection = 'newtweets';

function _connection() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
      resolve(db);
      reject(err);
    });
  });
}

async function findAll() {
  try {
    const db = await _connection();
    const now = new Date().getTime();
    // TODO just hack
    const hour = 60000 * 60;
    const time = now - (hour * 24) * 2;
    return db.collection(collection).find({
      'is_retweet': false,
    }, {
      $gt: time,
    }).sort({ timeStamp: 1 })
    .toArray();
  } catch (e) {
    throw new Error(e);
  }
}

async function findByDate(start, end) {
  try {
    const db = await _connection();
    return db.collection(collection).find({
      timeStamp: {
        $gt: parseInt(start, 10),
        $lt: parseInt(end, 10),
      },
      is_retweet: false,
    }, {}, {
      limit: 500,
    }).sort({ timeStamp: 1 })
    .toArray();
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  findAll, findByDate,
};
