/**
 * anlyses facebook data
 */
import fs from 'fs';
import salient from 'salient';
import cleanUp from './cleanUp';
import utils from './utils';
import _ from 'lodash';
import crossfilter from 'crossfilter2';
import request from 'request';
import redis from 'redis';
import bluebird from 'bluebird';
import _async from 'async';
// import moment from 'moment';

// import Promise from 'bluebird';
const GOOGLE_API_KEY = 'AIzaSyChXVTkq8bGhAxeJnQnNHfsmWcGcC2GXEE';
const GEO_CODE_API = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class Analyzer {

  constructor() {
    this.tokenizers = new salient.tokenizers.RegExpTokenizer({
      pattern: /\W+/,
    });
    this.sentiwordClassifier = new salient.sentiment.SentiwordnetAnalyser();
    this.classifier = new salient.sentiment.BayesSentimentAnalyser();
    this.POSTagger = new salient.tagging.HmmTagger();
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      /* eslint-disable no-console */
      console.error('Error ' + err);
    });
  }

  _readInData(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }

  _cleanUpData(raw, options) {
    let data = null;
    if (options.type === 'topic' || options.type === 'pages') {
      data = cleanUp.assignIds(raw);
    } else {
      data = cleanUp.tweeterData(raw);
    }
    if (options.type === 'topic') data = cleanUp.removeSelfPosts(options.poster, data);
    return data;
  }
  _getTopItems(terms, count) {
    let aggregated = _.countBy(terms, (n) => {
      return n;
    });
    aggregated = _.pairs(aggregated);
    let myCount = count;
    let truncated = null;
    if (!myCount) {
      truncated = aggregated;
    } else {
      if (myCount >= aggregated.length) myCount = aggregated.length / 2;
      aggregated = _.sortBy(aggregated, (n) => {
        return n[1];
      });
      truncated = aggregated.slice((aggregated.length - myCount), aggregated.length);
    }
    return truncated;
  }
  _getSentiment(sentence) {
    const sentiword = this.sentiwordClassifier.classify(sentence);
    const simpleBayes = this.classifier.classify(sentence);
    return sentiword + simpleBayes / 2;
  }

  _getKeyWords(text) {
    const nouns = [];
    if (!utils.isEmpty(text)) {
      const concepts = this.tokenizers.tokenize(text);
      concepts.forEach((concept) => {
        const tag = this.POSTagger.tag([concept]);
        if (tag[1] === 'NOUN' && concept.length > 3) {
          nouns.push(concept.toLowerCase());
        }
      });
    }
    return nouns;
  }

  createCrossFilter(raw) {
    return crossfilter(raw);
  }

  createCrossfilterDimension(crossfilterData, type) {
    try {
      return crossfilterData.dimension(d => d[type]);
    } catch (e) {
      /* eslint-disable no-console */
      console.log(e.stack);
    }
  }

  _saveToRedis(obj) {
    this.client.hmset(obj.location, 'lat', obj.lat, 'lng', obj.lng, redis.print);
  }

  _getFromRedis(key) {
    return new Promise((resolve, reject) => {
      this.client.hgetall(key, (err, reply) => {
        resolve(reply);
        reject(reply);
      });
    });
  }

  deletFromRedis(keys, cb) {
    _async.each(keys, (key, callback) => {
      this.client.del(key, (err) => {
        if (err) callback(err);
        callback();
      });
    }, (err) => {
      if (err) throw new Error('deleting keys error');
      cb();
    });
  }
  _geoCodeLocation(location) {
    const data = location.replace(' ', '+');
    const url = GEO_CODE_API + data + '&key=' + GOOGLE_API_KEY;
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (error) throw new Error(error);
        const coordinates = JSON.parse(body).results[0].geometry.location;
        this._saveToRedis({
          lat: coordinates.lat,
          lng: coordinates.lng,
          location,
        });
        resolve(coordinates);
        reject(error);
      });
    });
  }

  getCordinates(data, cb) {
    this._getSavedCoordinates(data, (unmapped, error) => {
      if (error) throw new Error('Getting coodinate error');
      _async.each(unmapped, async(d, callback) => {
        const location = d.location;
        const coordinates = await this._geoCodeLocation(location);
        if (coordinates) {
          d.coordinates = coordinates;
        }
        callback();
      }, (err) => {
        cb(data, err);
      });
    });
  }

  _getSavedCoordinates(data, cb) {
    const unmapped = [];
    _async.each(data, async(d, callback) => {
      const location = d.location;
      const coordinates = await this._getFromRedis(location);
      if (!coordinates || coordinates === undefined) {
        unmapped.push(d);
      }
      if (coordinates) {
        d.coordinates = coordinates;
      }
      callback();
    }, (error) => {
      console.log(unmapped);
      cb(unmapped, error);
    });
  }

  groupDimensionByCount(dimension, fn) {
    return dimension.group().reduceSum(fn);
  }

  groupDimensionBySum(dimension, field) {
    return dimension.group().reduceCount(d => d[field]);
  }

  getData(options) {
    const data = this._readInData(options.file);
    return this._cleanUpData(data, options);
  }

  fbPostsSentiments(list, field) {
    return new Promise((resolve, reject) => {
      list.forEach((post) => {
        let sentiment = null;
        if (!utils.isEmpty(post[field])) {
          sentiment = this.__getSentiment(post[field]);
          post.sentiment = sentiment;
        }
      });
      resolve(list);
      reject(null);
    });
  }

  fbPostsCommentsSentiments(list) {
    list.forEach((post) => {
      if (post.comments) {
        let sentiments = 0;
        post.comments.forEach((comment) => {
          if (!utils.isEmpty(comment.comment)) {
            const sentiment = this.__getSentiment(comment.comment);
            comment.sentiment = sentiment;
            sentiments += sentiment;
          }
        });
        post.commentSentiments = sentiments;
      }
    });
    return list;
  }

  fbPostsStats(list) {
    list.forEach((post) => {
      let commentsCount = post.comments.length;
      post.comments.forEach((comment) => {
        if (comment.reply) {
          commentsCount += comment.reply.length;
        }
      });
      post.likes = ~~post.likes;
      post.shares = ~~post.shares;
      post.commentsCount = commentsCount;
      delete post.comments;
    });
    return list;
  }

  fbPostsTerms(list) {
    list.forEach((post) => {
      post.terms = this.__getKeyWords(post.post);
      post.comments.forEach((comment) => {
        comment.terms = this.__getKeyWords(comment.comment);
      });
    });
    return list;
  }


  aggregatePostsTerms(count) {
    const posts = this.fbPostsTerms();
    let terms = [];
    posts.forEach((post) => {
      terms.push(post.terms);
      post.comments.forEach((comment) => {
        terms.push(comment.terms);
      });
    });
    terms = _.flatten(terms);
    const top = this._getTopItems(terms, count);
    return top;
  }

  fbPagesActiveCommenters(data, count) {
    const commenters = [];
    data.forEach((post) => {
      post.comments.forEach((comment) => {
        commenters.push(comment.commenters);
      });
    });
    return this._getTopItems(commenters, count);
  }


  topFrequentItems(data, field, count) {
    const results = data.map(item => item[field]);
    return this._getTopItems(results, count);
  }

  filterData(data, field, assertion) {
    return _.filter(data, d => d[field] === assertion || d[field].length > 0);
  }

  fbTopicsFrequentPosters(data, count) {
    return this.topFrequentItems(data, 'poster', count);
  }

  groupCountByDate(data, options) {
    const list = data.map(d => {
      let result = null;
      switch (options.time) {
        case 'hours':
          result = d.date.getHours();
          break;
        case 'minutes':
          result = d.date.getMinutes();
          break;
        case 'days':
          result = d.date.getDay();
          break;
        default:
          result = d.date;
      }
      return result;
    });
    const grp = this._getTopItems(list, options.count);
    return grp;
  }

  twTerms(data) {
    data.forEach((tweet) => {
      tweet.terms = this._getKeyWords(tweet.text);
    });
    return data;
  }
  topTwTerms(data, options) {
    let myData = data;
    if (options.filterRetweets) {
      myData = this.filterData(data, 'is_retweet', false);
    }
    const termedTweets = this.twTerms(myData);
    const terms = this.aggregateTerms(termedTweets);
    const topTerms = this._getTopItems(terms, options.count);
    return this._excludeTerms(topTerms, options.exclude);
  }
  _excludeTerms(data, exclude) {
    const filterd = _.filter(data, (obj) => {
      let isFilterdOut = false;
      exclude.forEach((n) => {
        if (obj[0].toLowerCase().trim() === n) isFilterdOut = true;
      });
      return !isFilterdOut;
    });
    return filterd;
  }
  aggregateTerms(data) {
    const terms = data.map(d => d.terms);
    const flattenTerms = _.flatten(terms, true);
    // console.log(flattenTerms);
    return flattenTerms;
  }

  tweetSentiments(data) {
    data.forEach((tweet) => {
      tweet.sentiment = this._getSentiment(tweet.text);
    });
    return data;
  }

  aggregateTwSentiments(data) {
    let sentimentCount = 0;
    data.forEach((tweet) => {
      sentimentCount += tweet.sentiment;
    });
    return sentimentCount / data.length;
  }

  nestTweetReplies(data) {
    const replies = _.filter(data, d => d.is_reply);
    data.forEach((tweet) => {
      tweet.replies = [];
      replies.forEach((r) => {
        if (r.in_reply_to_status_id === tweet.id) {
          tweet.replies.push(r);
        }
      });
    });
    return data;
  }
}
export default new Analyzer();
