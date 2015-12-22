import chai from 'chai';
import analyzer from '../lib/analyzer';
import path from 'path';
import prettyjson from 'prettyjson';
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
    expect(geoEnabled.top(2)).to.have.length.above(1);
  });

  describe('geocoding', () => {
    before(async(done) => {
      await analyzer._saveToRedis({
        location: 'kampala',
        lat: 0.3475964,
        lng: 32.5825197,
      });
      done();
    });

    it('should get location co-ordinates', async(done) => {
      const coordinates = await analyzer._geoCodeLocations('Kampala');
      /* eslint-disable no-console */
      console.log(prettyjson.render(coordinates));
      expect(coordinates.lat).to.be.a('number');
      done();
    });

    it('should get location co-ordinates if available on redis', async() => {
      const coordinates = await analyzer.getLocationCoordinates('kampala');
      /* eslint-disable no-console */
      console.log(coordinates);
      expect(coordinates).to.be.a('object');
    });
  });
});
