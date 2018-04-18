import agent from '../agent';
import {
  FILTER_LOG_AUCTION_WINNER,
  GET_LOG_AUCTION_WINER,
  LOG_AUCTION_WINER_UNLOAD,
  LOG_AUCTION_WINNER_DEFAULT,
  LOG_AUCTION_WINNER_FAILS,
  LOG_AUCTION_WINNER_SUCCESSFUL
} from '../constants/actionTypes';

export function getAuctionWinners(page = 1) {
  if (page < 0) page = 1;
  return {
    type: GET_LOG_AUCTION_WINER,
    payload: Promise.all([agent.AuctionWinner.getAll(page)])
  };
}

export function onUnload() {
  return {
    type: LOG_AUCTION_WINER_UNLOAD
  };
}

export function logDefault(id) {
  return {
    type: LOG_AUCTION_WINNER_DEFAULT,
    payload: agent.AuctionWinner.auctionWinnerDefault(id)
  };
}

export function logSuccessful(id) {
  return {
    type: LOG_AUCTION_WINNER_SUCCESSFUL,
    payload: agent.AuctionWinner.auctionWinnerSuccessful(id)
  };
}

export function logFails(id) {
  return {
    type: LOG_AUCTION_WINNER_FAILS,
    payload: agent.AuctionWinner.auctionWinnerFails(id)
  };
}

export function filterLogWinner(filter, page = 1) {
  if (page < 0) page = 1;
  return {
    type: FILTER_LOG_AUCTION_WINNER,
    payload: Promise.all([
      agent.AuctionWinner.filterAuctionWinner(filter, page)
    ])
  };
}
