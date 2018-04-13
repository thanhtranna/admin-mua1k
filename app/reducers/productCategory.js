import {
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCT_CATEGORIES_FULFILLED,
    PRODUCT_CATEGORIES_UNLOAD
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_PRODUCT_CATEGORIES:
        case GET_PRODUCT_CATEGORIES_FULFILLED:
            return {
                ...state,
                categories: action.payload ? action.payload[0].data.docs : null,
                total: action.payload ? action.payload[0].data.total : null,
                limit: action.payload ? action.payload[0].data.limit : null,
                page: action.payload ? action.payload[0].data.page : null,
                pages: action.payload ? action.payload[0].data.pages : null,
            };
            break;
        case PRODUCT_CATEGORIES_UNLOAD:
            return {};
            break;
        default:
            return state;
    }
};
