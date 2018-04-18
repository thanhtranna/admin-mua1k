import {
  GET_PRODUCTS,
  GET_PRODUCTS_FULFILLED,
  PRODUCTS_PAGE_UNLOAD,
  GET_DETAIL_PRODUCT,
  GET_DETAIL_PRODUCT_FULFILLED,
  DELETE_PRODUCT_PENDING,
  GET_CATEGORIES_CONDITIONS,
  GET_CATEGORIES_CONDITIONS_FULFILLED,
  CREATE_PRODUCT_PENDING,
  REDIRECT,
  CREATE_PRODUCT_REJECTED,
  LOAD_EDIT_PRODUCT,
  LOAD_EDIT_PRODUCT_FULFILLED,
  UPDATE_PRODUCT_REJECTED,
  UPDATE_PRODUCT_PENDING,
  SEARCH_PRODUCT,
  SEARCH_PRODUCT_FULFILLED,
  FILTER_PRODUCT,
  FILTER_PRODUCT_FULFILLED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
    case UPDATE_PRODUCT_PENDING:
    case CREATE_PRODUCT_PENDING:
    case DELETE_PRODUCT_PENDING:
      return {
        ...state,
        disabled: true
      };
      break;
    case GET_PRODUCTS_FULFILLED:
      return {
        ...state,
        products: action.payload ? action.payload[0].data.docs : null,
        categories: action.payload ? action.payload[1].data : null,
        total: action.payload ? action.payload[0].data.total : null,
        limit: action.payload ? action.payload[0].data.limit : null,
        page: action.payload ? action.payload[0].data.page : null,
        pages: action.payload ? action.payload[0].data.pages : null,
        disabled: false
      };
      break;
    case FILTER_PRODUCT:
    case FILTER_PRODUCT_FULFILLED:
    case SEARCH_PRODUCT:
    case SEARCH_PRODUCT_FULFILLED:
      return {
        ...state,
        products: action.payload ? action.payload[0].data.docs : null,
        categories: action.payload ? action.payload[1].data : null,
        total: action.payload ? action.payload[0].data.total : null,
        limit: action.payload ? action.payload[0].data.limit : null,
        page: action.payload ? action.payload[0].data.page : null,
        pages: action.payload ? action.payload[0].data.pages : null
      };
      break;
    case PRODUCTS_PAGE_UNLOAD:
      return {};
      break;
    case GET_DETAIL_PRODUCT:
    case GET_DETAIL_PRODUCT_FULFILLED:
      return {
        ...state,
        product: action.payload ? action.payload.data : null
      };
      break;
    case GET_CATEGORIES_CONDITIONS:
    case GET_CATEGORIES_CONDITIONS_FULFILLED:
      return {
        ...state,
        categories: action.payload ? action.payload[0].data : null,
        conditions: action.payload ? action.payload[1].data : null,
        disabled: false,
        errors: null
      };
      break;
    case LOAD_EDIT_PRODUCT:
    case LOAD_EDIT_PRODUCT_FULFILLED:
      return {
        ...state,
        product: action.payload ? action.payload[0].data : null,
        categories: action.payload ? action.payload[1].data : null,
        conditions: action.payload ? action.payload[2].data : null,
        disabled: false,
        errors: null
      };
      break;
    case REDIRECT:
      return {
        ...state,
        redirectTo: null
      };
      break;
    case UPDATE_PRODUCT_REJECTED:
    case CREATE_PRODUCT_REJECTED:
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
    default:
      return state;
  }
};
