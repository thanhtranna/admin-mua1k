import agent from '../agent';
import {
    CONTACT_CATEGORY_UNLOAD,
    DETAIL_CONTACT_CATEGORY,
    GET_CONTACT_CATEGORIES,
    POST_CONTACT_CATEGORY,
    REDIRECT,
    UPDATE_CONTACT_CATEGORY
} from '../constants/actionTypes';


export function onUnLoad() {
    return {
        type: CONTACT_CATEGORY_UNLOAD,
    }
}

export function getContactCategories(page = 1) {
    return {
        type: GET_CONTACT_CATEGORIES,
        payload: agent.ContactCategory.getAll(page)
    }
}

export function createContactCategory(data) {
    return {
        type: POST_CONTACT_CATEGORY,
        payload: agent.ContactCategory.create(data)
    }
}

export function getContactCategory(id) {
    return {
        type: DETAIL_CONTACT_CATEGORY,
        payload: agent.ContactCategory.detail(id)
    }
}

export function update(id, data) {
    return {
        type: UPDATE_CONTACT_CATEGORY,
        payload: agent.ContactCategory.update(id, data)
    }
}

export function onRedirect() {
    return {
        type: REDIRECT
    }
}
