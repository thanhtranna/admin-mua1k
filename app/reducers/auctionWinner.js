import {
  GET_LOG_AUCTION_WINER,
  GET_LOG_AUCTION_WINER_FULFILLED,
  GET_LOG_AUCTION_WINER_EJECTED,
  LOG_AUCTION_WINER_UNLOAD,
  FILTER_LOG_AUCTION_WINNER,
  FILTER_LOG_AUCTION_WINNER_FULFILLED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LOG_AUCTION_WINER:
    case GET_LOG_AUCTION_WINER_FULFILLED:
    case FILTER_LOG_AUCTION_WINNER:
    case FILTER_LOG_AUCTION_WINNER_FULFILLED:
      return {
        ...state,
        auctionWinners: action.payload ? action.payload[0].data.docs : null,
        total: action.payload ? action.payload[0].data.total : null,
        limit: action.payload ? action.payload[0].data.limit : null,
        page: action.payload ? action.payload[0].data.page : null,
        pages: action.payload ? action.payload[0].data.pages : null
      };
      break;
    case GET_LOG_AUCTION_WINER_EJECTED:
      return {
        ...state
      };
      break;
    case LOG_AUCTION_WINER_UNLOAD:
      return {};
      break;
    default:
      return state;
  }
};
