import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from '../store';
import Main from '../components/layouts/Main';
import {
  CampaignList,
  Login,
  Dashboard,
  UserList,
  UserShow,
  ProductShow,
  AuctionList,
  ProductCreate,
  ProductList,
  ShowAuction,
  AuctionCreate,
  ProductEdit,
  AuctionEdit,
  ReviewList,
  CampaignCreate,
  CampaignShow,
  CampaignEdit,
  MessageCreate,
  MessageList,
  MessageShow,
  MessageEdit,
  AuctionWinnerList,
  UserCommentList,
  ContactList,
  ContactShow,
  ContactReply,
  ProductCategoryList,
  ProductCategoryCreate,
  ConditionList,
  ConditionShow,
  ConditionCreate,
  ConditionEdit,
  UserAdminList,
  UserAdminCreate,
  ContactCategoryList,
  ContactCategoryCreate,
  ContactCategoryEdit,
  UserReportList,
  LogUserChanceBuy,
  DetailLogUserChanceBuy,
  UserAdminUpdate,
  LogUserCoinChargeList,
  HistoryAuctionByProduct,
  LogUserPointList,
  LogDiscountTicketList,
  LogProductFavoriteList,
  LogUserFriend
} from '../containers/index';

import { NotFound, BadRequest, ServerError } from '../components/errors/index';

export default (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/login" component={Login} />
      <Route path="/" component={Main}>
        <IndexRoute component={Dashboard} />
        <Route path="/home" component={Dashboard} />
        <Route path="/users" component={UserList} />
        <Route path="/user/:id" component={UserShow} />

        <Route path="/campaigns" component={CampaignList} />
        <Route path="/campaign/:id" component={CampaignShow} />
        <Route path="/campaigns/create" component={CampaignCreate} />
        <Route path="/campaigns/edit/:id" component={CampaignEdit} />

        <Route path="/auctions" component={AuctionList} />
        <Route path="/auction/:id" component={ShowAuction} />
        <Route path="/auctions/create" component={AuctionCreate} />
        <Route path="/auctions/edit/:id" component={AuctionEdit} />

        <Route path="/products" component={ProductList} />
        <Route path="/product/:id" component={ProductShow} />
        <Route path="/products/create" component={ProductCreate} />
        <Route path="/products/edit/:id" component={ProductEdit} />

        <Route path="/conditions" component={ConditionList} />
        <Route path="/conditions/:id" component={ConditionShow} />
        <Route path="/condition/create" component={ConditionCreate} />
        <Route path="/conditions/edit/:id" component={ConditionEdit} />
        <Route path="/messages" component={MessageList} />
        <Route path="/messages/:id" component={MessageShow} />
        <Route path="/messages/create" component={MessageCreate} />
        <Route path="/messages/edit/:id" component={MessageEdit} />

        <Route path="/contacts" component={ContactList} />
        <Route path="/contact/:id" component={ContactShow} />
        <Route path="/contact/reply/:id" component={ContactReply} />

        <Route path="/comment-users" component={UserCommentList} />
        <Route path="/winner-auctions" component={AuctionWinnerList} />
        <Route path="/reviews" component={ReviewList} />

        <Route
          path="/type-product-categories"
          component={ProductCategoryList}
        />
        <Route
          path="/type-product-category/create"
          component={ProductCategoryCreate}
        />

        <Route path="/admins" component={UserAdminList} />
        <Route path="/admin/create" component={UserAdminCreate} />
        <Route path="/admin/edit/:id" component={UserAdminUpdate} />

        <Route
          path="/type-contact-categories"
          component={ContactCategoryList}
        />
        <Route
          path="/type-contact-category/create"
          component={ContactCategoryCreate}
        />
        <Route
          path="/type-contact-category/edit/:id"
          component={ContactCategoryEdit}
        />

        <Route path="/report-users" component={UserReportList} />

        <Route path="/chance-buy-users" component={LogUserChanceBuy} />
        <Route
          path="/log-user-chance-buy/:id"
          component={DetailLogUserChanceBuy}
        />
        <Route
          path="/history-auction-by-product"
          component={HistoryAuctionByProduct}
        />
        <Route
          path="/log-user-coin-charge/:id"
          component={LogUserCoinChargeList}
        />
        <Route path="/log-user-point" component={LogUserPointList} />

        <Route
          path="/log-discount-ticket/:id"
          component={LogDiscountTicketList}
        />
        <Route
          path="/log-product-favorite/:id"
          component={LogProductFavoriteList}
        />
        <Route path="/log-friend/:id" component={LogUserFriend} />
      </Route>
      <Route path="/error/404" component={NotFound} />
      <Route path="/error/400" component={BadRequest} />
      <Route path="/error/500" component={ServerError} />
    </Router>
  </Provider>
);
