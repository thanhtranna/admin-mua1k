import agent from '../agent';
import {
    APP_LOAD, 
    APP_REDIRECT, 
    LOGOUT
} from '../constants/actionTypes';

export function appRedirect() {
    return {
        type: APP_REDIRECT
    }
}

export function appLoad(token) {
    return {
        type: APP_LOAD,
        payload: Promise.all([
            agent.Auth.current(),
            token
        ])
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}
