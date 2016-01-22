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
const mentions = ['museveni', 'besigye', 'mbabazi', 'baryamureeba', 'bwanika'];

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

function _addNamesToTweet(tweet) {
  // mutates the tweet by adding new fields
  mentions.forEach((mention) => {
    const bool = tweet.user_mentions.some(name => name.indexOf(mention) !== -1);
    tweet[mention] = bool ? 1 : 0;
  });
  return tweet;
}

function _excludeNamesInTerms(tweet) {
  mentions.push('amamambabazi');
  tweet.terms.forEach((term, index, arr) => {
    const isName = mentions.some(mention => mention.indexOf(term) !== -1);
    if (isName) arr.splice(index, 1);
  });
}

function transform(data) {
  data.forEach((d) => {
    // d.text = d.text.toLowerCase();
    // d.hour = new Date(d.date).getHours();
    _addNamesToTweet(d);
    _excludeNamesInTerms(d);
  });
  return data;
}
async function findAll() {
  try {
    const db = await _connection();
    const now = new Date();
    const hoursPast = now.getHours();
    const time = now - (hour * hoursPast);
    return db.collection(collection).find({
      'is_retweet': false,
      timeStamp: { $gt: time },
    })
      .toArray();
  } catch (e) {
    throw new Error(e);
  }
}

async function findByDate(start) {
  try {
    const db = await _connection();
    const end = parseInt(start, 10) + hour * 4;
    return db.collection(collection).find({
      timeStamp: {
        $gt: parseInt(start, 10),
        $lt: end,
      },
      is_retweet: false,
    })
    .toArray();
  } catch (e) {
    throw new Error(e);
  }
}


export default { findAll, findByDate, getFromRedis, transform };
