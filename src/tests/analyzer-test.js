import chai from 'chai';
import analyzer from '../lib/analyzer';
import path from 'path';
import prettyjson from 'prettyjson';
const expect = chai.expect;

describe('analyzer class', () => {
  let data = null;
  before('should read in data for tests', (done) => {
    const filePath = path.resolve(__dirname, '../content/tw-museveni.json');
    const options = {
      file: filePath,
      type: 'twitter',
    };
    data = analyzer.getData(options);
    expect(data).to.have.length.above(0);
    done();
  });

  it('should get top tweeps (user_name)', () => {
    const tweeps = analyzer.topFrequentItems(data, 'user_name', 5);
    /* eslint-disable no-console */
    console.log(prettyjson.render(tweeps));
    expect(tweeps).to.have.length.above(0);
  });

  it('should reduce data by time', () => {
    const reduced = analyzer.reduceByTime('dates');
    expect(reduced).to.have.length.above(1);
  });
});
