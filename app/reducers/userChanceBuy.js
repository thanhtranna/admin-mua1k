import {
    GET_USER_CHANCE_BUY,
    GET_USER_CHANCE_BUY_FULFILLED,
    GET_LOG_USER_CHANCE_BUY,
    GET_LOG_USER_CHANCE_BUY_FULFILLED,
    USER_CHANCE_BUY_UNLOAD
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_USER_CHANCE_BUY:
        case GET_USER_CHANCE_BUY_FULFILLED:
            return {
                ...state,
                userChanceBuys: action.payload ? action.payload.data.docs : null,
                total: action.payload ? action.payload.data.total : null,
                limit: action.payload ? action.payload.data.limit : null,
                page: action.payload ? action.payload.data.page : null,
                pages: action.payload ? action.payload.data.pages : null,
            };
            break;
        case GET_LOG_USER_CHANCE_BUY:
        case GET_LOG_USER_CHANCE_BUY_FULFILLED:
            return {
                ...state,
                logUserChanceBuys: action.payload ? action.payload.data.docs : null,
                total: action.payload ? action.payload.data.total : null,
                limit: action.payload ? action.payload.data.limit : null,
                page: action.payload ? action.payload.data.page : null,
                pages: action.payload ? action.payload.data.pages : null,
            };
            break;
        case USER_CHANCE_BUY_UNLOAD:
            return {};
            break;
        default:
            return state;
    }
};
