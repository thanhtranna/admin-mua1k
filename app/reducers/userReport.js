import {
  GET_USER_REPORTS,
  GET_USER_REPORTS_FULFILLED,
  USER_REPORT_UNLOAD
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REPORTS:
    case GET_USER_REPORTS_FULFILLED:
      return {
        ...state,
        userReports: action.payload ? action.payload[0].data.docs : null,
        total: action.payload ? action.payload[0].data.total : null,
        limit: action.payload ? action.payload[0].data.limit : null,
        page: action.payload ? action.payload[0].data.page : null,
        pages: action.payload ? action.payload[0].data.pages : null
      };
      break;

    case USER_REPORT_UNLOAD:
      return {};
      break;

    default:
      return state;
  }
};
