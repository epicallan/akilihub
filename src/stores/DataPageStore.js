/**
 * has methods that it inherites from a graph class
 * to morph data into objects different charts can work with
 */
import Dispatcher from '../core/Dispatcher';
import constants from '../constants/ActionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';


class UgandaPageStore extends EventEmitter {

  constructor() {
    super();
    this.data = null;
    this.newData = null;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  update(newData) {
    this.lastDate = newData[newData.length - 1].timeStamp;
    this.newData = newData;
    // this.data = this.data.concat(newData);
  }
  getIntialData(raw) {
    this.data = raw.data;
    this.aggregate = raw.aggregate;
    this.lastDate = this.data[this.data.length - 1].timeStamp;
  }

  getStoreState() {
    return {
      data: this.data,
      lastDate: this.lastDate,
      newData: this.newData,
      aggregate: this.aggregate,
    };
  }
}

const store = new UgandaPageStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case constants.DATAPAGE_RECEIVE_DATA:
      store.getIntialData(action.data);
      store.emitChange();
      break;
    case constants.DATAPAGE_UPDATE:
      store.update(action.data);
      store.emitChange();
      break;
    default:
      throw new Error('No specified action');
  }
});

export default store;
