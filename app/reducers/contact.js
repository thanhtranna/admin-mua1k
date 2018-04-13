import {
    CONTACTS_PAGE_UNLOAD,
    CONTACT_RESET_REDIRECT,
    GET_CONTACTS,
    GET_CONTACTS_FULFILLED,
    GET_DETAIL_CONTACT,
    GET_DETAIL_CONTACT_FULFILLED,
    REPLY_CONTACT_PENDING,
    DELETE_CONTACT_PENDING
} from '../constants/actionTypes';

export default (state = {contacts: []}, action) => {
    switch (action.type) {
        case GET_CONTACTS:
        case GET_CONTACTS_FULFILLED:
            return {
                ...state,
                contacts: action.payload ? action.payload.data.docs : null,
                total: action.payload ? action.payload.data.total : null,
                limit: action.payload ? action.payload.data.limit : null,
                page: action.payload ? action.payload.data.page : null,
                pages: action.payload ? action.payload.data.pages : null,
                disabled: false
            };
            break;

        case GET_DETAIL_CONTACT:
        case GET_DETAIL_CONTACT_FULFILLED:
            return {
                ...state,
                contact: action.payload ? action.payload.data : null,
                disabled: false
            };
            break;

        case REPLY_CONTACT_PENDING:
        case DELETE_CONTACT_PENDING:
            return {
                ...state,
                disabled: true
            };
            break;

        case CONTACTS_PAGE_UNLOAD:
            return {};
            break;

        case CONTACT_RESET_REDIRECT:
            return {
                ...state,
                redirectTo: null
            };
            break;
        default:
            return state;
    }
};
