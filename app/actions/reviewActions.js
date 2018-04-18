import agent from '../agent';
import {
  APPROVE_REVIEW,
  BLOCK_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW
} from '../constants/actionTypes';

export function getReviews(page = 1) {
  return {
    type: GET_REVIEWS,
    payload: Promise.all([agent.Review.getAll(page)])
  };
}

export function blockReview(id) {
  return {
    type: BLOCK_REVIEW,
    payload: agent.Review.block(id)
  };
}

export function approveReview(id) {
  return {
    type: APPROVE_REVIEW,
    payload: agent.Review.approve(id)
  };
}

export function deletedReview(id) {
  alert(id);
  return {
    type: DELETE_REVIEW,
    payload: agent.Review.delete(id)
  };
}
