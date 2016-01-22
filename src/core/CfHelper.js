/**
 * cross filter helper
 */
import crossfilter from 'crossfilter2';
import _ from 'lodash';

class CfHelper {

  createCrossFilter(data) {
    return crossfilter(data);
  }
  getMinAndMax(group, field) {
    const keys = group.all().map(d => d[field]);
    return [_.max(keys), _.min(keys)];
  }
  createDimension(cfData, type) {
    try {
      return cfData.dimension(d => {
        if (d[type]) return d[type];
      });
    } catch (e) {
      /* eslint-disable no-console */
      console.log(e.stack);
    }
  }
  reduceGroupObjs(group) {
    // find highest value
    const topObj = group.top(1);
    // console.log(topObj);
    return {
      all: () => {
        return group.all().filter(d => d.value > Math.floor(topObj[0].value / 3));
      },
    };
  }
  fakeGroup(group, field) {
    return {
      all: () => {
        return group.all().filter(d => d[field].length > 1);
      },
    };
  }
  purgeNumericalGroup(group, field) {
    return {
      all: () => {
        return group.all().filter(d => !isNaN(parseFloat(d[field])) && isFinite(d[field]));
      },
    };
  }
  createSumGroup(dim, attr) {
    const grp = dim.group().reduceSum(d => d[attr]);
    /* grp.all = () => {
      return grp.all().filter(d => d.value !== 0 || d.value !== null);
    }; */
    return grp;
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

  _removeLowGroupObjs(group) {
    // find highest value
    const values = _.values(group);
    const max = _.max(values);
    console.log(max);
    const transformedGrp = {};
    _.forOwn(group, function (value, key) {
      if (value > Math.floor(max / 6)) transformedGrp[key] = value;
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
    const group = this._removeLowGroupObjs(rawGrp);
    this.groupPatches(group);
    return { dim, group };
  }
}
export default new CfHelper();
