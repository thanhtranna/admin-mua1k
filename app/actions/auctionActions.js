import agent from '../agent';
import {
  GET_AUCTIONS,
  GET_AUCTION,
  DELETE_AUCTION,
  GET_AUCTION_PRODUCTS,
  CREATE_AUCTION,
  LOAD_EDIT_AUCTION,
  UPDATE_AUCTION,
  BLOCK_AUCTION,
  AUCTIONS_PAGE_UNLOAD,
  FILTER_AUCTION,
  SEARCH_AUCTION,
  GET_ALL_PRODUCTS,
  FILTER_AUCTION_BY_PRODUCT
} from '../constants/actionTypes';

export function getAuctions(page = 1) {
  return {
    type: GET_AUCTIONS,
    payload: agent.Auction.getAuctions(page)
  };
}

export function getAuction(id) {
  return {
    type: GET_AUCTION,
    payload: agent.Auction.getAuction(id)
  };
}

export function agentDelAuction(id) {
  return {
    type: DELETE_AUCTION,
    payload: agent.Auction.deleteAuction(id)
  };
}

export function getAuctionProducts() {
  return {
    type: GET_AUCTION_PRODUCTS,
    payload: agent.Auction.getAuctionProducts()
  };
}

export function createAuction(data) {
  return {
    type: CREATE_AUCTION,
    payload: agent.Auction.create(data)
  };
}

export function onLoadEdit(id) {
  return {
    type: LOAD_EDIT_AUCTION,
    payload: Promise.all([
      agent.Auction.getAuction(id),
      agent.Auction.getAuctionProducts(),
      agent.User.getUserToArray()
    ])
  };
}

export function updateAuction(id, data) {
  return {
    type: UPDATE_AUCTION,
    payload: agent.Auction.edit(id, data)
  };
}

export function onUnLoad() {
  return {
    type: AUCTIONS_PAGE_UNLOAD
  };
}

export function onBlockAuction(id) {
  return {
    type: BLOCK_AUCTION,
    payload: agent.Auction.block(id)
  };
}

export function filterAuction(status, page = 1) {
  return {
    type: FILTER_AUCTION,
    payload: agent.Auction.filter(status, page)
  };
}

export function searchAuction(name, page = 1) {
  return {
    type: SEARCH_AUCTION,
    payload: agent.Auction.search(name, page)
  };
}

export function getAllProducts() {
  return {
    type: GET_ALL_PRODUCTS,
    payload: agent.Auction.getAuctionProducts()
  };
}

export function filterAuctionByProduct(id, page = 1) {
  return {
    type: FILTER_AUCTION_BY_PRODUCT,
    payload: Promise.all([
      agent.Auction.getAuctionProducts(),
      agent.Auction.filterByProducts(id, page)
    ])
  };
}
