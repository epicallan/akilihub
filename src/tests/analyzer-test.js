import chai from 'chai';
import analyzer from '../lib/analyzer';
import path from 'path';
// import prettyjson from 'prettyjson';
const expect = chai.expect;

describe('analyzer class', () => {
  let data = null;
  let cfData = null;

  before('should read in data for tests', (done) => {
    const filePath = path.resolve(__dirname, '../content/tw-museveni.json');
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
    /* eslint-disable no-console */
    // console.log(prettyjson.render(geoEnabled.top(1)));
    expect(geoEnabled.top(2)).to.have.length.above(1);
  });

  describe('geocoding', () => {
    before(async(done) => {
      await analyzer._saveToRedis({
        location: 'masaka',
        lat: 0.124,
        lng: 32.57,
      });
      done();
    });

    it('should get location co-ordinates', async(done) => {
      const coordinates = await analyzer._geoCodeLocation('kampala');
      expect(coordinates.lat).to.be.a('number');
      done();
    });

    it('should be able to get from redis', async(done) => {
      const coordinates = await analyzer._getFromRedis('kampala');
      // console.log(coordinates);
      expect(coordinates).to.be.an('object');
      done();
    });

    it('should get location co-ordinates if available on redis', () => {
      const payload = [{
        location: 'kampala',
      }, {
        location: 'wakiso',
      }, {
        location: 'masaka',
      }];
      analyzer.getCordinates(payload, (results, error) => {
        if (error) console.log(error);
        console.log('****results****');
        console.log(results);
        expect(results[0]).to.be.an('object');
      });
    });
  });
});
