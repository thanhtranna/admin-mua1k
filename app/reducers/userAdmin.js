import {
    GET_USER_ADMINS,
    GET_USER_ADMINS_FULFILLED,
    USER_ADMIN_UNLOAD,
    CREATE_USER_ADMIN_REJECTED,
    CREATE_USER_ADMIN_PENDING,
    USER_ADMIN_REDIRECT,
    UPDATE_USER_ADMIN_PENDING,
    UPDATE_USER_ADMIN_REJECTED
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_USER_ADMINS:
        case GET_USER_ADMINS_FULFILLED:
            return {
                ...state,
                userAdmins: action.payload ? action.payload[0].data.docs : null,
                total: action.payload ? action.payload[0].data.total : null,
                limit: action.payload ? action.payload[0].data.limit : null,
                page: action.payload ? action.payload[0].data.page : null,
                pages: action.payload ? action.payload[0].data.pages : null,
            };
            break;
        case USER_ADMIN_UNLOAD:
            return {};
            break;
        case UPDATE_USER_ADMIN_PENDING:
        case CREATE_USER_ADMIN_PENDING:
            return {
                ...state,
                disabled: true
            };
            break;
        case USER_ADMIN_REDIRECT:
            return { ...state, redirectTo: null };
            break;
        case UPDATE_USER_ADMIN_REJECTED:
        case CREATE_USER_ADMIN_REJECTED:
            if (action.payload.response.body.status === 401) {
                return {
                    ...state, redirectTo: '/login'
                };
            }
            if (action.payload.response.body.status === 404) {
                return {
                    ...state, redirectTo: '/error/404'
                };
            }
            if (action.payload.response.body.status === 400) {
                return {
                    ...state, redirectTo: '/error/400'
                };
            }
            if (action.payload.response.body.status === 500) {
                return {
                    ...state, redirectTo: '/error/500'
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
