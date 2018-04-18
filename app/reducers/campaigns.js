import {
  GET_CAMPAIGNS,
  GET_CAMPAIGNS_FULFILLED,
  DELETE_CAMPAIGN_PENDING,
  CREATE_CAMPAIGN_PENDING,
  CREATE_CAMPAIGN_REJECTED,
  CAMPAIGNS_PAGE_UNLOAD,
  GET_DETAIL_CAMPAIGN,
  GET_DETAIL_CAMPAIGN_FULFILLED,
  FILTER_CAMPAIGN_FULFILLED,
  FILTER_CAMPAIGN,
  EDIT_CAMPAIGN_LOAD,
  EDIT_CAMPAIGN_LOAD_FULFILLED,
  UPDATE_CAMPAIGN_REJECTED,
  UPDATE_CAMPAIGN_PENDING,
  CAMPAIGN_RESET_REDIRECT
} from '../constants/actionTypes';

export default (state = { campaigns: [] }, action) => {
  switch (action.type) {
    case GET_CAMPAIGNS:
    case GET_CAMPAIGNS_FULFILLED:
      return {
        ...state,
        campaigns: action.payload ? action.payload.data.docs : null,
        total: action.payload ? action.payload.data.total : null,
        limit: action.payload ? action.payload.data.limit : null,
        page: action.payload ? action.payload.data.page : null,
        pages: action.payload ? action.payload.data.pages : null,
        disabled: false
      };
      break;
    case EDIT_CAMPAIGN_LOAD:
    case EDIT_CAMPAIGN_LOAD_FULFILLED:
      return {
        ...state,
        campaign: action.payload ? action.payload.data : null,
        disabled: false,
        errors: null
      };
      break;
    case UPDATE_CAMPAIGN_PENDING:
    case CREATE_CAMPAIGN_PENDING:
    case DELETE_CAMPAIGN_PENDING:
      return {
        ...state,
        disabled: true
      };
      break;
    case CAMPAIGNS_PAGE_UNLOAD:
      return {};
      break;
    case GET_DETAIL_CAMPAIGN:
    case GET_DETAIL_CAMPAIGN_FULFILLED:
      return {
        ...state,
        campaign: action.payload ? action.payload.data : null
      };
      break;
    case FILTER_CAMPAIGN:
    case FILTER_CAMPAIGN_FULFILLED:
      return {
        ...state,
        campaigns: action.payload ? action.payload.data.docs : null,
        total: action.payload ? action.payload.data.total : null,
        limit: action.payload ? action.payload.data.limit : null,
        page: action.payload ? action.payload.data.page : null,
        pages: action.payload ? action.payload.data.pages : null
      };
    case UPDATE_CAMPAIGN_REJECTED:
    case CREATE_CAMPAIGN_REJECTED:
      if (action.payload.response.body.status === 401) {
        return {
          ...state,
          redirectTo: '/login'
        };
      }
      if (action.payload.response.body.status === 404) {
        return {
          ...state,
          redirectTo: '/error/404'
        };
      }
      if (action.payload.response.body.status === 400) {
        return {
          ...state,
          redirectTo: '/error/400'
        };
      }
      if (action.payload.response.body.status === 500) {
        return {
          ...state,
          redirectTo: '/error/500'
        };
      }
      if (action.payload.response.body.status === 422) {
        return {
          ...state,
          errors: action.payload ? action.payload.response.body : null,
          disabled: false
        };
      }
      break;
    case CAMPAIGN_RESET_REDIRECT:
      return { ...state, redirectTo: null };
      break;
    default:
      return state;
  }
};
