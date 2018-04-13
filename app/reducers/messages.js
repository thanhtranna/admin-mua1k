import {
    GET_MESSAGES,
    GET_MESSAGES_FULFILLED,
    GET_MESSAGES_REJECTED,
    GET_MESSAGE,
    GET_MESSAGE_FULFILLED,
    GET_MESSAGE_REJECTED,
    DELETE_MESSAGE_PENDING,
    DELETE_MESSAGE_REJECTED,
    EDIT_MESSAGE_LOAD,
    EDIT_MESSAGE_LOAD_FULFILLED,
    EDIT_MESSAGE_LOAD_REJECTED,
    CATEGORY_MESSAGE_REJECTED,
    UPDATE_MESSAGE_PENDING,
    UPDATE_MESSAGE_REJECTED,
    GET_MESSAGE_CATEGORIES,
    GET_MESSAGE_CATEGORIES_FULFILLED,
} from '../constants/actionTypes';

export default (state = {messages: []}, action) => {
    switch (action.type) {
        case GET_MESSAGES:
        case GET_MESSAGES_FULFILLED:
            return {
                ...state,
                messages: action.payload ? action.payload.data.docs : null,
                total: action.payload ? action.payload.data.total : null,
                limit: action.payload ? action.payload.data.limit : null,
                page: action.payload ? action.payload.data.page : null,
                pages: action.payload ? action.payload.data.pages : null,
            };
            break;
        case GET_MESSAGE:
        case GET_MESSAGE_FULFILLED:
            return {
                ...state,
                message: action.payload ? action.payload.data : null
            };
            break;
        case EDIT_MESSAGE_LOAD:
        case EDIT_MESSAGE_LOAD_FULFILLED:
            return {
                ...state,
                message: action.payload ? action.payload[0].data : null,
                categories: action.payload ? action.payload[1].data : null
            };
            break;

        case GET_MESSAGE_CATEGORIES:
        case GET_MESSAGE_CATEGORIES_FULFILLED:
            return {
                ...state,
                categories: action.payload ? action.payload.data : null
            };
            break;
        case GET_MESSAGES_REJECTED:
        case GET_MESSAGE_REJECTED:
        case DELETE_MESSAGE_REJECTED:
        case EDIT_MESSAGE_LOAD_REJECTED:
        case CATEGORY_MESSAGE_REJECTED:
            return {
                ...state,
                disabled: false
            };
            break;
        case DELETE_MESSAGE_PENDING:
            return {
                ...state,
                disabled: true
            };
            break;
        case UPDATE_MESSAGE_PENDING:
            return {
                ...state,
                disabled: false,
                errors: null
            };
            break;
        case UPDATE_MESSAGE_REJECTED:
            return {
                ...state,
                disabled: false,
            };
            break;
        default:
            return state;
    }
};
