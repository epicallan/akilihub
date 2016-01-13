import chai from 'chai';
import cf from '../core/CfHelper';
import path from 'path';
import fs from 'fs';
import prettyjson from 'prettyjson';
const expect = chai.expect;
import testData from './fixtures/cfdata';


describe('cf helper tests', () => {
  let cfData = null;
  before((done) => {
    const filePath = path.resolve(__dirname, '../content/besigye.json');
    fs.readFile(filePath, (error, json) => {
      if (error) console.log(error);
      cfData = cf.createCrossFilter(json);
      done();
    });
  });
  it('should remove null values', () => {
    const cfTestData = cf.createCrossFilter(testData);
    const dim = cf.createDimension(cfTestData, 'state');
    const group = dim.group().reduceCount();
    console.log(prettyjson.render(group.all()));
    expect(group.all()).to.be.an('array');
  });
  it.skip('should have method for getting an array filed group and dimension', () => {
    const {
      group
    } = cf.arrayDimAndGroup(cfData, 'user_mentions');
    // console.log(prettyjson.render(group.all()));
    expect(group).to.be.an('object');
  });

  it.skip('should remove objects of less frequency in a group', () => {
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
