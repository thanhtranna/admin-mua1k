import {
  LOG_USER_COIN_CHARGE,
  LOG_USER_COIN_CHARGE_FULFILLED,
  LOG_USER_COIN_CHARGE_UNLOAD
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOG_USER_COIN_CHARGE:
    case LOG_USER_COIN_CHARGE_FULFILLED:
      return {
        ...state,
        logUserCoinCharges: action.payload ? action.payload.data.docs : null,
        total: action.payload ? action.payload.data.total : null,
        limit: action.payload ? action.payload.data.limit : null,
        page: action.payload ? action.payload.data.page : null,
        pages: action.payload ? action.payload.data.pages : null
      };
      break;
    case LOG_USER_COIN_CHARGE_UNLOAD:
      return {};
      break;
    default:
      return state;
  }
};
