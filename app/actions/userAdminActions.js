import agent from '../agent';
import {
  CREATE_USER_ADMIN,
  GET_USER_ADMINS,
  USER_ADMIN_UNLOAD,
  USER_ADMIN_REDIRECT,
  UPDATE_USER_ADMIN
} from '../constants/actionTypes';

export function getUserAdmins(page = 1) {
  return {
    type: GET_USER_ADMINS,
    payload: Promise.all([agent.User.getAllUserAdmin(page)])
  };
}

export function onUnLoad() {
  return {
    type: USER_ADMIN_UNLOAD
  };
}

export function postUserAdmin(data) {
  return {
    type: CREATE_USER_ADMIN,
    payload: agent.User.createUserAdmin(data)
  };
}

export function onRedirect() {
  return {
    type: USER_ADMIN_REDIRECT
  };
}

export function putUserAdmin(id, data) {
  return {
    type: UPDATE_USER_ADMIN,
    payload: agent.User.updateUserAdmin(id, data)
  };
}
