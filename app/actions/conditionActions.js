import agent from '../agent';
import {
  GET_CONDITIONS,
  GET_CONDITION,
  CREATE_CONDITION,
  DELETE_CONDITION,
  UPDATE_CONDITION,
  CONDITION_PAGE_UNLOAD
} from '../constants/actionTypes';

export function getConditions(page = 1) {
  return {
    type: GET_CONDITIONS,
    payload: agent.Condition.getAll(page)
  };
}

export function getCondition(id) {
  return {
    type: GET_CONDITION,
    payload: agent.Condition.show(id)
  };
}

export function createCondition(id) {
  return {
    type: CREATE_CONDITION,
    payload: agent.Condition.create(id)
  };
}
export function delCondition(id) {
  return {
    type: DELETE_CONDITION,
    payload: agent.Condition.delete(id)
  };
}
export function putCondition(id, data) {
  return {
    type: UPDATE_CONDITION,
    payload: agent.Condition.update(id, data)
  };
}
export function onUnload() {
  return {
    type: CONDITION_PAGE_UNLOAD
  };
}
