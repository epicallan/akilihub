/**
 * Gets data from Twitter model
 */
import redis from 'redis';
import Twitter from '../models/Twitter';
import crossfilter from 'crossfilter2';

const client = redis.createClient();


async function findData() {
  try {
    return Twitter.find({
      'is_retweet': false,
    })
    .select('timeStamp')
    .exec();
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
