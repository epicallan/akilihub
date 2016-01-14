/**
 * Gets data from Twitter model
 */
import mongodb from 'mongodb';
import { MONGO_URL } from '../../config';

const MongoClient = mongodb.MongoClient;

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
    return db.collection('twitters').find({ 'is_retweet': false }).toArray();
  } catch (e) {
    throw new Error(e);
  }
}

async function findByDate(date) {
  try {
    const db = await _connection();
    return db.collection('twitters').find({
      date: {
        $gt: date,
      },
      is_retweet: false,
    }).toArray();
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  findAll, findByDate,
};
