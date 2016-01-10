import analyzer from '../lib/analyzer.js';

export default class Controller {

  constructor(options) {
    this.data = analyzer.getData(options);
    this.data = analyzer.addToUserMentions(this.data, ['museveni', 'besigye']);
  }

  getTopTweeps() {
    return analyzer.topFrequentItems(this.data, 'user_name', 5);
  }
  _addCordinates(data) {
    return new Promise((resolve, reject) => {
      analyzer.getCordinates(data, (results, error) => {
        resolve(results);
        reject(error);
      });
    });
  }

  cacheSentimatedData(cb) {
    this._addCordinates(this.data).then((res) => {
      const sentimated = analyzer.tweetSentiments(res);
      analyzer.saveJsonRedis(sentimated, 'sentimated', cb);
    }).catch((error) => {
      throw new Error(error);
    });
  }

  getSentimatedData(key, cb) {
    analyzer.getJsonRedis(key, cb);
  }
}
