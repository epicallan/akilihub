/**
 * Data source action dispatched as aresult of getting data from data base
 */

import Dispatcher from '../core/Dispatcher';
import constants from '../constants/ActionTypes';

class DataPageActions {

  getData(raw) {
    Dispatcher.dispatch({
      actionType: constants.DATAPAGE_RECEIVE_DATA,
      data: raw,
    });
  }
  update(raw) {
    Dispatcher.dispatch({
      actionType: constants.DATAPAGE_UPDATE,
      data: raw,
    });
  }
}

export default new DataPageActions();
