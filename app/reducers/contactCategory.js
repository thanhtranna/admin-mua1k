import {
  CONTACT_CATEGORY_UNLOAD,
  GET_CONTACT_CATEGORIES,
  GET_CONTACT_CATEGORIES_FULFILLED,
  DETAIL_CONTACT_CATEGORY,
  DETAIL_CONTACT_CATEGORY_FULFILLED,
  POST_CONTACT_CATEGORY_REJECTED,
  POST_CONTACT_CATEGORY_PENDING,
  UPDATE_CONTACT_CATEGORY_PENDING,
  UPDATE_CONTACT_CATEGORY_REJECTED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CONTACT_CATEGORIES:
    case GET_CONTACT_CATEGORIES_FULFILLED:
      return {
        ...state,
        contactCategories: action.payload ? action.payload.data.docs : null,
        total: action.payload ? action.payload.data.total : null,
        limit: action.payload ? action.payload.data.limit : null,
        page: action.payload ? action.payload.data.page : null,
        pages: action.payload ? action.payload.data.pages : null,
        disabled: false
      };
      break;
    case CONTACT_CATEGORY_UNLOAD:
      return {};
      break;
    case DETAIL_CONTACT_CATEGORY:
    case DETAIL_CONTACT_CATEGORY_FULFILLED:
      return {
        ...state,
        contactCategory: action.payload ? action.payload.data : null
      };
      break;
    case UPDATE_CONTACT_CATEGORY_REJECTED:
    case POST_CONTACT_CATEGORY_REJECTED:
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
    case UPDATE_CONTACT_CATEGORY_PENDING:
    case POST_CONTACT_CATEGORY_PENDING:
      return {
        ...state,
        disabled: true
      };
      break;
    default:
      return state;
  }
};
