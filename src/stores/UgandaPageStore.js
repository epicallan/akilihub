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

  getData(raw) {
    this.data = raw;
  }

  getStoreState() {
    return this.data;
  }
}

const store = new UgandaPageStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case constants.UGANDA_DECIDES_RECEIVE_DATA:
      store.getData(action.data);
      store.emitChange();
      break;
    default:
      throw new Error('No specified action');
  }
});

export default store;
