import {
    GET_REVIEWS_FULFILLED
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEWS_FULFILLED:
            return {
                ...state,
                reviews: action.payload ? action.payload[0].data.docs : null,
                total: action.payload ? action.payload[0].data.total : null,
                limit: action.payload ? action.payload[0].data.limit : null,
                page: action.payload ? action.payload[0].data.page : null,
                pages: action.payload ? action.payload[0].data.pages : null,
                disabled: false
            };
            break;
        default:
            return state;
    }
};
