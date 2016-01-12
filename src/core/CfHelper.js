/**
 * cross filter helper
 */
import crossfilter from 'crossfilter2';
import _ from 'lodash';

class CfHelper {

  createCrossFilter(data) {
    return crossfilter(data);
  }

  createDimension(cfData, type) {
    try {
      return cfData.dimension(d => d[type]);
    } catch (e) {
      /* eslint-disable no-console */
      console.log(e.stack);
    }
  }
  createSumGroup(dim, attr) {
    return dim.group().reduceSum(d => d[attr]);
  }

  createGroupByCount(dimension, fn) {
    return dimension.group().reduceSum(fn);
  }

  groupDimensionBySum(dimension, field) {
    return dimension.group().reduceCount(d => d[field]);
  }

  reduceAdd(attr) {
    return (p, v) => {
      if (v[attr][0] === '') return p; // skip empty values
      v[attr].forEach((val) => {
        p[val] = (p[val] || 0) + 1; // increment counts
      });
      return p;
    };
  }

  reduceRemove(attr) {
    return (p, v) => {
      if (v[attr][0] === '') return p; // skip empty values
      v[attr].forEach((val) => {
        p[val] = (p[val] || 0) - 1; // decrement counts
      });
      return p;
    };
  }

  reduceInitial() {
    return {};
  }

  allGroupPatch(group) {
    /* eslint-disable func-names */
    group.all = function () {
      const newObject = [];
      for (const key in this) {
        if (this.hasOwnProperty(key) && key !== 'all' && key !== 'top') {
          newObject.push({
            key,
            value: this[key],
          });
        }
      }
      return newObject;
    };
  }

  topGroupPatch(group) {
    /* eslint-disable func-names */
    group.top = function (count) {
      const newObject = this.all();
      newObject.sort((a, b) => {
        return b.value - a.value;
      });
      return newObject.slice(0, count);
    };
  }

  removeLowGroupObjs(group) {
    // find highest value
    const values = _.values(group);
    const max = _.max(values);
    const transformedGrp = {};
    _.forOwn(group, function (value, key) {
      if (value > Math.floor(max / 8)) transformedGrp[key] = value;
    });
    return transformedGrp;
  }

  groupPatches(group) {
    this.allGroupPatch(group);
    this.topGroupPatch(group);
    return group;
  }
  arrayDimAndGroup(cfData, attr) {
    function reduceInitial() {
      return {};
    }
    const dim = this.createDimension(cfData, attr);
    const rawGrp = dim.groupAll().reduce(this.reduceAdd(attr), this.reduceRemove(attr), reduceInitial).value();
    const group = this.removeLowGroupObjs(rawGrp);
    this.groupPatches(group);
    return { dim, group };
  }
}
export default new CfHelper();
