import agent from '../agent';
import {
  BLOCK_USER_REPORT,
  GET_USER_REPORTS,
  USER_REPORT_UNLOAD
} from '../constants/actionTypes';

export function getUserReports(page = 1) {
  return {
    type: GET_USER_REPORTS,
    payload: Promise.all([agent.User.getUserReport(page)])
  };
}

export function onUnLoad() {
  return {
    type: USER_REPORT_UNLOAD
  };
}

export function blockUser(id) {
  return {
    type: BLOCK_USER_REPORT,
    payload: agent.User.block(id)
  };
}
