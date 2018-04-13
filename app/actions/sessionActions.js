import agent from '../agent';
import {
    LOGIN, 
    LOGIN_LOAD, 
    LOGIN_UNLOAD, 
    REDIRECT
} from '../constants/actionTypes';

export function loginUser(email, password) {
    return {
        type: LOGIN,
        payload: agent.Auth.login(email, password)
    }
}

export function onRedirect() {
    return {
        type: REDIRECT
    }
}

export function onUnLoad() {
    return {
        type: LOGIN_UNLOAD
    }
}

export function onLoad() {
    return {
        type: LOGIN_LOAD,
        payload: agent.Auth.current()
    }
}
