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
    done();
  });

  it('should get top tweeps (user_name)', () => {
    const tweeps = analyzer.topFrequentItems(data, 'user_name', 5);
    expect(tweeps).to.have.length.above(0);
  });

  it('should reduce data using crossfilter dimensions', () => {
    const reduced = analyzer.createCrossfilterDimension(cfData, 'geo_enabled');
    const geoEnabled = reduced.filter(true);
    expect(geoEnabled.top(2)).to.have.length.above(1);
  });

  it('should get top terms in tweets', () => {
    const filtered = analyzer.filterData(data, 'is_retweet', false);
    const termedTweets = analyzer.twTerms(filtered);
    const exclude = ['president', 'museveni'];
    const terms = analyzer.aggregateTerms(termedTweets);
    const topTerms = analyzer._getTopItems(terms, 15);
    const refinedTop = analyzer._excludeTerms(topTerms, exclude);
    /* eslint-disable no-console */
    console.log(prettyjson.render(refinedTop));
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
