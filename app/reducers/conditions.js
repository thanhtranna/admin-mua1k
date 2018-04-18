import {
  GET_CONDITIONS,
  GET_CONDITIONS_FULFILLED,
  GET_CONDITION,
  GET_CONDITION_FULFILLED,
  DELETE_CONDITION_PENDING,
  CONDITION_PAGE_UNLOAD
} from '../constants/actionTypes';

export default (state = { conditions: [] }, action) => {
  switch (action.type) {
    case GET_CONDITIONS:
    case GET_CONDITIONS_FULFILLED:
      return {
        ...state,
        conditions: action.payload ? action.payload.data.docs : null,
        total: action.payload ? action.payload.data.total : null,
        limit: action.payload ? action.payload.data.limit : null,
        page: action.payload ? action.payload.data.page : null,
        pages: action.payload ? action.payload.data.pages : null
      };
      break;
    case GET_CONDITION:
    case GET_CONDITION_FULFILLED:
      return {
        ...state,
        condition: action.payload ? action.payload.data : null
      };
      break;
    case DELETE_CONDITION_PENDING:
      return {
        ...state,
        disabled: true
      };
      break;
    case CONDITION_PAGE_UNLOAD:
      return {};
      break;
    default:
      return state;
  }
};
