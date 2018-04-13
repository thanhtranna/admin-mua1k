import agent from '../agent';
import {
    GET_USER_CHANCE_BUY,
    GET_LOG_USER_CHANCE_BUY,
    USER_CHANCE_BUY_UNLOAD
} from '../constants/actionTypes';

export function getAll(page = 1) {
    return {
        type: GET_USER_CHANCE_BUY,
        payload: agent.UserChanceBuy.getAll(page),
    }
}

export function getLog(id, page = 1) {
    return {
        type: GET_LOG_USER_CHANCE_BUY,
        payload: agent.UserChanceBuy.getLog(id, page)
    }
}

export function onUnload() {
    return {
        type: USER_CHANCE_BUY_UNLOAD,
    }
}
