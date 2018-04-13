import {
    GET_AUCTIONS,
    GET_AUCTION_FULFILLED,
    GET_AUCTIONS_FULFILLED,
    GET_AUCTION,
    GET_AUCTION_PRODUCTS,
    GET_AUCTION_PRODUCTS_FULFILLED,
    CREATE_AUCTION,
    CREATE_AUCTION_REJECTED,
    GET_USERS_TO_ARRAY,
    GET_USERS_TO_ARRAY_FULFILLED,
    EDIT_AUCTION,
    LOAD_EDIT_AUCTION_FULFILLED,
    AUCTIONS_PAGE_UNLOAD,
    EDIT_AUCTION_REJECTED,
    BLOCK_AUCTION,
    BLOCK_AUCTION_FULFILLED,
    BLOCK_AUCTION_REJECTED,
    FILTER_AUCTION,
    FILTER_AUCTION_FULFILLED,
    SEARCH_AUCTION,
    SEARCH_AUCTION_FULFILLED,
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_FULFILLED,
    FILTER_AUCTION_BY_PRODUCT,
    FILTER_AUCTION_BY_PRODUCT_FULFILLED
} from '../constants/actionTypes';

export default (state = {auctions: []}, action) => {
    switch (action.type) {
        case GET_AUCTIONS :
        case GET_AUCTIONS_FULFILLED:
        case FILTER_AUCTION:
        case FILTER_AUCTION_FULFILLED:
        case SEARCH_AUCTION:
        case SEARCH_AUCTION_FULFILLED:
                return {
                    ...state,
                    auctions: action.payload.data.docs,
                    total: action.payload ? action.payload.data.total : null,
                    limit: action.payload ? action.payload.data.limit : null,
                    page: action.payload ? action.payload.data.page : null,
                    pages: action.payload ? action.payload.data.pages : null,
                };
                break;
        case GET_AUCTION:
        case GET_AUCTION_FULFILLED:
                return {
                    ...state,
                    auction: action.payload.data
                };
                break;
        case GET_AUCTION_PRODUCTS:
        case GET_AUCTION_PRODUCTS_FULFILLED:
            return {
                ...state,
                products : action.payload.data
            };
            break;
        case CREATE_AUCTION:
        case CREATE_AUCTION_REJECTED:
            if (action.payload.response.body.status === 422) {
                return {
                    ...state,
                    errors: action.payload.response.body,
                    redirectTo: '/auctions/create'
                }
            }
            break;
        case GET_USERS_TO_ARRAY:
        case GET_USERS_TO_ARRAY_FULFILLED:
            return {
                ...state,
                usersArray : action.payload.data
            };
            break;
        case EDIT_AUCTION:
        case EDIT_AUCTION_REJECTED:
            if (action.payload.response.body.status === 422 || action.payload.response.body.status === 400) {
                return {
                    ...state,
                    errors: action.payload.response.body
                }
            }
            break;
        case LOAD_EDIT_AUCTION_FULFILLED:
            return {
                ...state,
                auction: action.payload ? action.payload[0].data : null,
                products: action.payload ? action.payload[1].data : null,
                users: action.payload ? action.payload[2].data : null,
                disabled: false,
                errors: null
            };
            break;
        case AUCTIONS_PAGE_UNLOAD:
            return {};
            break;
        case BLOCK_AUCTION:
        case BLOCK_AUCTION_FULFILLED:
            return{
                ...state,
                disabled: true
            };
            break;
        case BLOCK_AUCTION_REJECTED:
            return {
                ...state,
                disabled: false
            };
            break;
        case GET_ALL_PRODUCTS:
        case GET_ALL_PRODUCTS_FULFILLED:
            return {
                ...state,
                products: action.payload ? action.payload.data : null
            };
            break;
        case FILTER_AUCTION_BY_PRODUCT:
        case FILTER_AUCTION_BY_PRODUCT_FULFILLED:
            return {
                ...state,
                products: action.payload ? action.payload[0].data : null,
                auctions: action.payload ? action.payload[1].data.docs : null,
                total: action.payload ? action.payload[1].data.total : null,
                limit: action.payload ? action.payload[1].data.limit : null,
                page: action.payload ? action.payload[1].data.page : null,
                pages: action.payload ? action.payload[1].data.pages : null,
            };
            break;
        default:
            return state;
    }
};
