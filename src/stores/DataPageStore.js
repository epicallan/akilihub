import Dispatcher from '../core/Dispatcher';
import constants from '../constants/ActionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';


class DataPageStore extends EventEmitter {

  constructor() {
    super();
    this.data = [];
    this.newData = [];
    this.isInitialUpdate = true;
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
  update(newData, updateType) {
    this.newData = newData;
    this.isInitialUpdate = updateType;
  }

  getIntialData(raw) {
    // console.log('intial data');
    this.data = raw.data;
    // there is a possibility that this can be undefined
    // incases where we use update data as initial data
    if (raw.aggregate !== undefined) this.aggregate = raw.aggregate;
  }

  getStoreState() {
    return {
      data: this.data,
      newData: this.newData,
      aggregate: this.aggregate,
      isInitialUpdate: this.isInitialUpdate,
    };
  }
}

const store = new DataPageStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case constants.DATAPAGE_RECEIVE_DATA:
      store.getIntialData(action.data);
      store.emitChange();
      break;
    case constants.DATAPAGE_UPDATE:
      store.update(action.data, action.updateType);
      store.emitChange();
      break;
    default:
      throw new Error('No specified action');
  }
});

export default store;
