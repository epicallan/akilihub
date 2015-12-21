import analyzer from '../lib/analyzer.js';

export default class Controller {

  constructor(options) {
    this.data = analyzer.getData(options);
  }

  getTopTweeps() {
    return analyzer.topFrequentItems(this.data, 'user_name', 5);
  }
}
