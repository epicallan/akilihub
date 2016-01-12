/**
 * Gets data from Twitter model
 */
import mongodb from 'mongodb';
import config from '../../config';
const MONGO_URL = config.MONGO_URL;
const MongoClient = mongodb.MongoClient;

function _connection() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
      resolve(db);
      reject(err);
    });
  });
}

export default async function findAll() {
  try {
    const db = await _connection();
    return new Promise((resolve) => {
      resolve(db.collection('twitters').find());
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function findByDate(date) {
  try {
    const db = await _connection();
    return db.collection('restaurants').find({
      date
    });
  } catch (e) {
    throw new Error(e);
  }
}
