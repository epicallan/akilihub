/**
 * Data source action dispatched as aresult of getting data from data base
 */

import Dispatcher from '../core/Dispatcher';
import constants from '../constants/ActionTypes';

class UgandaPageActions {

  getData(raw) {
    Dispatcher.dispatch({
      actionType: constants.UGANDA_DECIDES_RECEIVE_DATA,
      data: raw,
    });
  }

}

export default new UgandaPageActions();
