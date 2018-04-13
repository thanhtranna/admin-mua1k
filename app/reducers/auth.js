import {
    LOGIN,
    LOGIN_REJECTED,
    LOGIN_FULFILLED,
    REDIRECT,
    LOGIN_LOAD,
    LOGIN_LOAD_REJECTED,
    LOGIN_LOAD_FULFILLED,
    LOGIN_UNLOAD
} from '../constants/actionTypes';

export default (state = {users: []}, action) => {
    switch (action.type) {
        case LOGIN:
        case LOGIN_FULFILLED:
            return {
                ...state, redirectTo: '/users'
            };
            break;
        case LOGIN_REJECTED:
        case LOGIN_LOAD:
        case LOGIN_LOAD_REJECTED:
            let statusError = action.payload.response.body.status;
            if (statusError === 401) {
                return {
                    ...state, redirectTo: '/login'
                };
            }
            if (statusError === 422 || statusError === 400 || statusError === 404 || statusError === 500) {
                return {
                    ...state,
                    errors: action.payload.response.body,
                    redirectTo: '/login'
                }
            }
            break;
        case LOGIN_LOAD_FULFILLED:
            return {
                ...state, redirectTo: '/'
            };
            break;
        case REDIRECT:
            return {
                ...state, redirectTo: null
            };
            break;
        case LOGIN_UNLOAD:
            return {};
            break;
        default:
            return state;
    }
};
