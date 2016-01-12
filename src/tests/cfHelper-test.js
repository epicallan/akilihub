import chai from 'chai';
import cf from '../core/CfHelper';
import path from 'path';
import fs from 'fs';
import prettyjson from 'prettyjson';
const expect = chai.expect;
// import testData from './fixtures/cfdata';


describe('should create crossfilter groupings from array values', () => {
  let cfData = null;
  before((done) => {
    const filePath = path.resolve(__dirname, '../content/besigye.json');
    fs.readFile(filePath, (json) => {
      cfData = cf.createCrossFilter(json);
      done();
    });
  });
  it('should have method for getting an array filed group and dimension', () => {
    const { group } = cf.arrayDimAndGroup(cfData, 'user_mentions');
    console.log(prettyjson.render(group.all()));
    expect(group).to.be.an('object');
  });

  it('should remove objects of less frequency in a group', () => {
    const grp = {
      Technology: 10,
      Science: 6,
      Automotive: 2,
      Health: 1,
    };
    const newGrp = cf.removeLowGroupObjs(grp);
    // console.log(prettyjson.render(newGrp));
    expect(newGrp).to.be.an('object');
  });
});
