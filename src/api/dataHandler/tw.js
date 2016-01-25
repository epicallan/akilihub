import redis from 'redis';
import Twitter from '../models/Twitter';
import _async from 'async';
const client = redis.createClient();

const hour = 60000 * 60;
const mentions = ['museveni', 'besigye', 'mbabazi', 'baryamureeba', 'bwanika'];
let exludedFields = '-_id -__v -has_user_mentions -geo_enabled -time_zone -approximated_geo ';
exludedFields += '-favorite_count -user_id -retweet_count -has_hashtags -is_retweet -is_reply';
let saved = 0;
let notSaved = 0;

export function getFromRedis() {
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
    const bool = tweet.user_mentions.some(name => name.toLowerCase().includes(mention));
    tweet[mention] = bool ? 1 : 0;
  });
  return tweet;
}
function _excludeNamesInTerms(tweet) {
  mentions.forEach((mention) => {
    tweet.terms.forEach((term, index, arr) => {
      const isName = term.toLowerCase().includes(mention);
      if (isName) arr.splice(index, 1);
    });
  });
  return tweet;
}

export function saveTweets(data, cb) {
  _async.each(data, (d, callback) => {
    const twitter = new Twitter(d);
    twitter.save((err) => {
      if (err) {
        /* eslint-disable no-console*/
        console.log(`error ${err.message} not saved ${d.id}`);
        notSaved ++;
      } else {
        saved ++;
      }
      callback();
    });
  }, (error) => {
    if (error) throw new Error(error);
    cb({ saved, notSaved });
  });
}

export function transform(raw) {
  return raw.map((d) => {
    const tweet = d.toObject();
    tweet.text = tweet.text.toLowerCase();
    _addNamesToTweet(tweet);
    _excludeNamesInTerms(tweet);
    return tweet;
  });
}
export async function findAll() {
  try {
    const now = new Date();
    const hoursPast = now.getHours();
    const time = now - (hour * hoursPast);
    return Twitter.find({
      'is_retweet': false,
      timeStamp: { $gt: time },
    })
    .select(exludedFields)
    .exec();
  } catch (e) {
    throw new Error(e);
  }
}

export async function findByDate(start) {
  try {
    const end = parseInt(start, 10) + hour * 4;
    return Twitter.find({
      timeStamp: {
        $gt: parseInt(start, 10),
        $lt: end,
      },
      is_retweet: false,
    })
    .select(exludedFields)
    .exec();
  } catch (e) {
    throw new Error(e);
  }
}
