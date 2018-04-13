import agent from '../agent';
import {
    CONTACTS_PAGE_UNLOAD,
    CONTACT_RESET_REDIRECT,
    GET_CONTACTS,
    GET_DETAIL_CONTACT,
    DELETE_CONTACT,
    REPLY_CONTACT
} from '../constants/actionTypes';

export function onUnLoad() {
    return {
        type: CONTACTS_PAGE_UNLOAD,
    }
}

export function onRedirect() {
    return {
        type: CONTACT_RESET_REDIRECT
    }
}

export function getContacts(page = 1) {
    return {
        type: GET_CONTACTS,
        payload: agent.Contact.getAll(page)
    }
}

export function getContact(id) {
    return {
        type: GET_DETAIL_CONTACT,
        payload: agent.Contact.show(id)
    }
}

export function replyContact(data) {
    return {
        type: REPLY_CONTACT,
        payload: agent.Contact.reply(data)
    }
}

export function deleteContact(id) {
    return {
        type: DELETE_CONTACT,
        payload: agent.Contact.delete(id)
    }
}
