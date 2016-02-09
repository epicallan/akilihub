import chai from 'chai';
// import prettyjson from 'prettyjson';
import tw from '../api/controllers/twitters';
const expect = chai.expect;

/* eslint-disable func-names  */
describe('tw dataHandler unit tests', function () {
  this.timeout(5000);
  let date = null;
  it.skip('should get all data from mongodb', async(done) => {
    try {
      const cursor = await tw.findAll();
      date = cursor[cursor.length - 5].timeStamp;
      expect(cursor).to.have.length.above(10);
      done();
    } catch (e) {
      /* eslint-disable no-console  */
      console.log(e.message);
    }
  });
  it.skip('should get data above the last date', async (done) => {
    try {
      const cursor = await tw.findByDate(date);
      console.log(' length: ' + cursor.length);
      expect(cursor).to.have.length.above(1);
      done();
    } catch (e) {
      /* eslint-disable no-console  */
      console.log(e.message);
    }
  });
  it('should create a new field with only the names we are tracking', () => {
  });
});
