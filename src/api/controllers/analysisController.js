import analyzer from '../lib/analyzer.js';

export default class Controller {

  constructor(options) {
    this.data = analyzer.getData(options);
  }

  getTopTweeps() {
    return analyzer.topFrequentItems(this.data, 'user_name', 5);
  }
  __addCordinates(data) {
    return new Promise((resolve, reject) => {
      analyzer.getCordinates(data, (results, error) => {
        resolve(results);
        reject(error);
      });
    });
  }

  getSentimatedData(cb) {
    this.__addCordinates(this.data).then((res) => {
      const sentimated = analyzer.tweetSentiments(res);
      cb(sentimated);
    }).catch((error) => {
      throw new Error(error);
    });
  }
}
