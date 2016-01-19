/**
 * Gets data from Twitter model
 */
import mongodb from 'mongodb';
import redis from 'redis';
import { MONGO_URL } from '../../config';
import crossfilter from 'crossfilter2';

const client = redis.createClient();

const MongoClient = mongodb.MongoClient;
const collection = 'twits';

console.log(MONGO_URL);

function _connection() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
      resolve(db);
      reject(err);
    });
  });
}

async function findData() {
  try {
    const db = await _connection();
    return db.collection(collection).find({
      'is_retweet': false,
    }, { timeStamp: 1, _id: 0 })
    .toArray();
  } catch (e) {
    console.log(e);
  }
}

async function aggregateData() {
  const data = await findData();
  data.forEach(d => {
    d.date = new Date(d.timeStamp).getDate();
  });
  const cfData = crossfilter(data);
  const dim = cfData.dimension((d) => d.date);
  const group = dim.group().reduceCount();
  return group.all();
}

export default async function job() {
  const data = await aggregateData();
  client.set('tw', JSON.stringify(data), (err, res) => {
    if (err) throw new Error(err);
    /* eslint-disable no-console*/
    console.log(`completed job ${new Date()} ${res}`);
  });
}
