import { combineReducers } from 'redux';

import {
  users,
  common,
  auth,
  product,
  auctions,
  campaigns,
  review,
  messages,
  contact,
  auctionWinner,
  userComment,
  productCategory,
  conditions,
  userAdmin,
  contactCategory,
  userReport,
  userChanceBuy,
  logUserCoinCharge
} from './reducers/index';

export default combineReducers({
  users,
  common,
  auth,
  auctions,
  product,
  campaigns,
  review,
  messages,
  contact,
  auctionWinner,
  userComment,
  productCategory,
  conditions,
  userAdmin,
  contactCategory,
  userReport,
  userChanceBuy,
  logUserCoinCharge
});
