import agent from '../agent';

import {
  CREATE_MESSAGE,
  GET_MESSAGES,
  GET_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE_LOAD,
  UPDATE_MESSAGE,
  GET_MESSAGE_CATEGORIES
} from '../constants/actionTypes';

export function getMessages(page = 1) {
  if (page < 0) page = 1;
  return {
    type: GET_MESSAGES,
    payload: agent.Message.getAll(page)
  };
}
export function getMessage(id) {
  return {
    type: GET_MESSAGE,
    payload: agent.Message.show(id)
  };
}

export function createMessage(data) {
  return {
    type: CREATE_MESSAGE,
    payload: agent.Message.create(data)
  };
}

export function delMessage(id) {
  return {
    type: DELETE_MESSAGE,
    payload: agent.Message.delete(id)
  };
}

export function getCategories() {
  return {
    type: GET_MESSAGE_CATEGORIES,
    payload: agent.Message.getAllCategory()
  };
}

export function onLoadEdit(id) {
  return {
    type: EDIT_MESSAGE_LOAD,
    payload: Promise.all([
      agent.Message.show(id),
      agent.Message.getAllCategory()
    ])
  };
}

export function putMessage(id, data) {
  return {
    type: UPDATE_MESSAGE,
    payload: agent.Message.update(id, data)
  };
}
