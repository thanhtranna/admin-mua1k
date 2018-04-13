import {
    GET_USERS,
    GET_USERS_FULFILLED,
    GET_DETAIL_USER,
    GET_DETAIL_USER_FULFILLED,
    DELETE_USER_PENDING,
    DELETE_USER_REJECTED,
    BLOCK_USER_PENDING,
    BLOCK_USER_REJECTED,
    USERS_PAGE_UNLOAD,
    FILTER_USERS,
    FILTER_USERS_FULFILLED,
    SEARCH_USERS,
    LOG_USER_POINT,
    LOG_USER_POINT_FULFILLED,
    SEARCH_USERS_FULFILLED,
    LOG_DISCOUNT_TICKET,
    LOG_DISCOUNT_TICKET_FULFILLED,
    LOG_DISCOUNT_TICKET_UNLOAD,
    LOG_PRODUCT_FAVORITE_UNLOAD,
    LOG_PRODUCT_FAVORITE,
    LOG_PRODUCT_FAVORITE_FULFILLED,
    LOG_FRIEND_UNLOAD,
    LOG_FRIEND,
    LOG_FRIEND_FULFILLED
} from '../constants/actionTypes';

export default (state = {users: []}, action) => {
    switch (action.type) {
        case GET_USERS:
        case DELETE_USER_PENDING:
        case BLOCK_USER_PENDING:
            return {
                ...state,
                disabled: true
            };
            break;
        case DELETE_USER_REJECTED:
        case BLOCK_USER_REJECTED:
            return {
                ...state,
                disabled: false
            };
            break;
        case GET_USERS_FULFILLED:
        case FILTER_USERS:
        case FILTER_USERS_FULFILLED:
        case SEARCH_USERS:
        case SEARCH_USERS_FULFILLED:
            return {
                ...state,
                users: action.payload.data.docs,
                total: action.payload.data.total,
                limit: action.payload.data.limit,
                page: action.payload.data.page,
                pages: action.payload.data.pages,
                disabled: false
            };
            break;
        case GET_DETAIL_USER:
        case GET_DETAIL_USER_FULFILLED:
            return {
                ...state,
                user: action.payload ? action.payload.data : null
            };
            break;
        case LOG_FRIEND_UNLOAD:
        case LOG_PRODUCT_FAVORITE_UNLOAD:
        case LOG_DISCOUNT_TICKET_UNLOAD:
        case USERS_PAGE_UNLOAD:
            return {};
            break;
        case LOG_USER_POINT:
        case LOG_USER_POINT_FULFILLED:
            return {
                ...state,
                logUserPoints: action.payload.data.docs,
                total: action.payload.data.total,
                limit: action.payload.data.limit,
                page: action.payload.data.page,
                pages: action.payload.data.pages,
                disabled: false
            };
            break;
        case LOG_DISCOUNT_TICKET:
        case LOG_DISCOUNT_TICKET_FULFILLED:
            return {
                ...state,
                discountTickets: action.payload ? action.payload.data.docs : null,
                total: action.payload ? action.payload.data.total : null,
                limit: action.payload ? action.payload.data.limit : null,
                page: action.payload ? action.payload.data.page : null,
                pages: action.payload ? action.payload.data.pages : null
            };
            break;
        case LOG_PRODUCT_FAVORITE:
        case LOG_PRODUCT_FAVORITE_FULFILLED:
            return {
                ...state,
                productFavorites: action.payload ? action.payload.data.docs : null,
                total: action.payload ? action.payload.data.total : null,
                limit: action.payload ? action.payload.data.limit : null,
                page: action.payload ? action.payload.data.page : null,
                pages: action.payload ? action.payload.data.pages : null
            };
            break;
        case LOG_FRIEND:
        case LOG_FRIEND_FULFILLED:
            return {
                ...state,
                friends: action.payload ? action.payload.data : null
            };
            break;
        default:
            return state;
    }
};
