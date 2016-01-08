import chai from 'chai';
import DcCharts from '../components/Charts/';
import testData from './fixtures/dcDataFixture';
// import prettyjson from 'prettyjson';

const expect = chai.expect;

describe.skip('dcCharts test', () => {
  let dcCharts = null;

  before((done) => {
    dcCharts = new DcCharts(testData);
    expect(dcCharts.data.size()).to.be.above(1);
    done();
  });

  it('should create a crossfilter dimension and group', () => {
    const dim = dcCharts.createDimenion('hour');
    // console.log(prettyjson.render(dim.top(1)));
    const group = dcCharts.createGroup(dim, 'sentiment');
    // console.log(prettyjson.render(group.all()));
    expect(dim.top(1)).to.be.an('array');
    expect(group.top(1)).to.be.an('array');
  });
});
