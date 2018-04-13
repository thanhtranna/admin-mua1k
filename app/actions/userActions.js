import agent from '../agent';
import {
    BLOCK_USER,
    DELETE_USER,
    GET_USERS,
    GET_DETAIL_USER,
    USERS_PAGE_UNLOAD,
    FILTER_USERS,
    SEARCH_USERS,
    LOG_USER_COIN_CHARGE,
    LOG_USER_COIN_CHARGE_UNLOAD,
    LOG_USER_POINT,
    LOG_DISCOUNT_TICKET,
    LOG_DISCOUNT_TICKET_UNLOAD,
    LOG_PRODUCT_FAVORITE,
    LOG_PRODUCT_FAVORITE_UNLOAD,
    LOG_FRIEND,
    LOG_FRIEND_UNLOAD
} from "../constants/actionTypes";

export function getUsers(page = 1) {
    return {
        type: GET_USERS,
        payload: agent.User.getAll(page)
    }
}

export function onUnload() {
    return {
        type: USERS_PAGE_UNLOAD,
    }
}

export function deleteUser(id) {
    return {
        type: DELETE_USER,
        payload: agent.User.delete(id)
    }
}

export function blockUser(id) {
    return {
        type: BLOCK_USER,
        payload: agent.User.block(id)
    }
}

export function getUser(id) {
    return {
        type: GET_DETAIL_USER,
        payload: agent.User.detail(id)
    }
}
export function filterUsers(status, page = 1) {
    return {
        type: FILTER_USERS,
        payload: agent.User.filter(status, page)
    }
}
export function onSearch(value, page = 1) {
    return {
        type: SEARCH_USERS,
        payload: agent.User.search(value, page)

    }
}

export function getLogUserCoinCharge(id, page = 1) {
    return {
        type: LOG_USER_COIN_CHARGE,
        payload: agent.User.getLogUserCoinCharge(id, page)

    }
}

export function onUnLoadLogUserCoinCharge() {
    return {
        type : LOG_USER_COIN_CHARGE_UNLOAD
    }
}

export function getLogDiscountTicket(id, page =1) {
    return {
        type: LOG_DISCOUNT_TICKET,
        payload: agent.User.getLogDiscountTicket(id, page)

    }
}

export function getLogUserPoint(page = 1) {
    return {
        type: LOG_USER_POINT,
        payload: agent.User.getLogUserPoint(page)

    }
}

export function onUnLoadLogDiscountTicket() {
    return {
        type : LOG_DISCOUNT_TICKET_UNLOAD
    }
}

export function getLogProductFavorite(id, page = 1) {
    return {
        type: LOG_PRODUCT_FAVORITE,
        payload: agent.User.getLogProductFavorite(id, page)

    }
}

export function onUnLoadLogProductFavorite() {
    return {
        type : LOG_PRODUCT_FAVORITE_UNLOAD
    }
}

export function getLogFriend(id) {
    return {
        type: LOG_FRIEND,
        payload: agent.User.getLogfriend(id)

    }
}

export function onUnLoadLogFriend() {
    return {
        type : LOG_FRIEND_UNLOAD
    }
}
