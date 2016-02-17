/**
 * Gets data from Twitter model
 */
import redis from 'redis';
import Twitter from '../models/Twitter';
import crossfilter from 'crossfilter2';
import moment from 'moment';
import { REDIS_PORT, REDIS_ADDR } from '../../config';

const client = redis.createClient(REDIS_PORT, REDIS_ADDR);

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
  if (!data.length) return false;
  data.forEach(d => {
    const momentDate = moment(new Date(d.timeStamp));
    d.date = momentDate.format('YYYY-MM-DD');
  });
  const cfData = crossfilter(data);
  const dim = cfData.dimension((d) => d.date);
  const group = dim.group().reduceCount();
  return group.all();
}

export default async function job() {
  const data = await aggregateData();
  const aggregate = data.map(d => {
    return {
      tweets: d.value,
      date: d.key,
    };
  });
  // console.log(aggregate);
  client.set('tw', JSON.stringify(aggregate), (err, res) => {
    if (err) throw new Error(err);
    /* eslint-disable no-console*/
    console.log(`completed job ${new Date()} ${res}`);
  });
}
