import chai from 'chai';
import analyzer from '../lib/analyzer';
import path from 'path';
import prettyjson from 'prettyjson';
const expect = chai.expect;

describe('analyzer class', () => {
  let data = null;
  let cfData = null;

  before('should read in data for tests', (done) => {
    const filePath = path.resolve(__dirname, '../content/museveni.json');
    const options = {
      file: filePath,
      type: 'twitter',
    };
    data = analyzer.getData(options);
    cfData = analyzer.createCrossFilter(data);
    expect(data).to.have.length.above(0);
    expect(cfData.size()).to.be.above(0);
    done();
  });

  it('should get top tweeps (user_name)', () => {
    const tweeps = analyzer.topFrequentItems(data, 'user_name', 5);
    expect(tweeps).to.have.length.above(0);
  });

  it('should reduce data using crossfilter dimensions and filter by a field value', () => {
    const reduced = analyzer.createCrossfilterDimension(cfData, 'geo_enabled');
    // const geoEnabled = reduced.filter(true);

    expect(reduced.top(2)).to.have.length.above(1);
  });

  it('should be able to create a time grouping from the dimension', () => {
    /* eslint-disable no-console */
    // console.log(data[0]);
    const grp = analyzer.groupCountByDate(data);
    console.log(prettyjson.render(grp));
    expect(grp.size()).to.be.above(1);
  });
  it('should get top terms in tweets', () => {
    const refinedTop = analyzer.topTwTerms(data, {
      filterRetweets: true,
      exclude: ['president', 'museveni'],
      count: 10,
    });
    expect(refinedTop).to.have.length.above(0);
  });

  describe('geocoding', () => {
    before(async(done) => {
      await analyzer._saveToRedis({
        location: 'masaka',
        lat: -0.3267383,
        lng: 31.7537404,
      });
      done();
    });
    after((done) => {
      analyzer.deletFromRedis(['jinja', 'masaka'], done);
    });
    it('should get location co-ordinates', async(done) => {
      const coordinates = await analyzer._geoCodeLocation('masaka');
      expect(coordinates.lat).to.be.a('number');
      done();
    });

    it('should be able to get from redis', async(done) => {
      const coordinates = await analyzer._getFromRedis('kampala');
      expect(coordinates).to.be.an('object');
      done();
    });

    it('should get location co-ordinates if cached on redis or from google map API', () => {
      const payload = [{
        location: 'kampala',
      }, {
        location: 'jinja',
      }, {
        location: 'masaka',
      }];
      analyzer.getCordinates(payload, (results, error) => {
        /* eslint-disable no-console */
        if (error) console.log(error);
        // console.log(prettyjson.render(results));
        expect(results[0]).to.be.an('object');
      });
    });
  });
});
