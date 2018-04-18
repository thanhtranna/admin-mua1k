import agent from '../agent';
import {
  APPROVE_USER_COMMENT,
  BLOCK_USER_COMMENT,
  LOAD_USER_COMMENTS
} from '../constants/actionTypes';

export function getUserComments(page = 1) {
  return {
    type: LOAD_USER_COMMENTS,
    payload: agent.User.getUserComments(page)
  };
}

export function approvedUserComment(id) {
  return {
    type: APPROVE_USER_COMMENT,
    payload: agent.User.putUserCommentApproved(id)
  };
}

export function blockUserComment(id) {
  return {
    type: BLOCK_USER_COMMENT,
    payload: agent.User.putUserCommentBlock(id)
  };
}
