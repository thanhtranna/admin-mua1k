import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import Promise from 'es6-promise';
let conf = require('./config/development');

if (process.env.NODE_ENV === 'staging') {
  conf = require('./config/staging');
}

const API_ROOT = conf.API_ROOT;
// const API_ROOT = "https://stg-tokubuy.bap.jp/api/v1";
// const API_ROOT = 'http://localhost:1337/api/v1';

const superagent = superagentPromise(_superagent, Promise);

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('admin-token', `${token}`);
  }
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const User = {
  getAll: page => requests.get(`/admin/users?page=${page}`),
  detail: id => requests.get(`/admin/user/${id}`),
  delete: id => requests.del(`/admin/user/${id}`),
  block: id => requests.put(`/admin/user/block/${id}`),
  getUserToArray: () => requests.get('/admin/users/toArray'),
  getUserComments: page => requests.get(`/admin/user-comment?page=${page}`),
  putUserCommentApproved: id =>
    requests.put(`/admin/user-comment/approved/${id}`),
  putUserCommentBlock: id => requests.put(`/admin/user-comment/block/${id}`),
  filter: (status, page) =>
    requests.get(`/admin/users/filter?page=${page}&type=${status}`),
  search: (value, page) =>
    requests.get(`/admin/users/search?value=${value}&&page=${page}`),
  getAllUserAdmin: page => requests.get(`/admin/user-admins?page=${page}`),
  createUserAdmin: data => requests.post(`/admin/user-admin`, data),
  getUserReport: page => requests.get(`/admin/user-reports?page=${page}`),
  updateUserAdmin: (id, data) => requests.put(`/admin/user-admin/${id}`, data),
  getLogUserCoinCharge: (id, page) =>
    requests.get(`/admin/log-user-coin-charge/${id}?page=${page}`),
  getLogUserPoint: page => requests.get(`/admin/log-user-points?page=${page}`),
  getLogDiscountTicket: (id, page) =>
    requests.get(`/admin/discount-ticket/${id}?page=${page}`),
  getLogProductFavorite: (id, page) =>
    requests.get(`/admin/product-favorite/${id}?page=${page}`),
  getLogfriend: id => requests.get(`/admin/log-friend/${id}`)
};

const Auth = {
  current: () => requests.get('/admin/me'),
  login: (email, password) =>
    requests.post('/admin/login', { email, password }),
  token: token => requests.post('/check-token', token)
};

const Auction = {
  getAuctions: page => requests.get(`/admin/auctions?page=${page}`),
  getAuction: id => requests.get(`/admin/auction/${id}`),
  deleteAuction: id => requests.del(`/admin/auction/${id}`),
  getAuctionProducts: () => requests.get(`/admin/auctions/products`),
  create: data => requests.post('/admin/auction', data),
  edit: (id, data) => requests.put(`/admin/auction/${id}`, data),
  block: id => requests.put(`/admin/auction/block/${id}`),
  filter: (status, page) =>
    requests.get(`/admin/auctions/filter?page=${page}&type=${status}`),
  search: (name, page) =>
    requests.get(`/admin/auctions/search?value=${name}&page=${page}`),
  filterByProducts: (id, page) =>
    requests.get(`/admin/log-auction/${id}?page=${page}`)
};

const Product = {
  getAll: page => requests.get(`/admin/products?page=${page}`),
  show: id => requests.get(`/admin/product/${id}`),
  delete: id => requests.del(`/admin/product/${id}`),
  create: data => requests.post('/admin/product', data),
  update: (id, data) => requests.put(`/admin/product/${id}`, data),
  search: (name, page) =>
    requests.get(`/admin/products?name=${name}&&page=${page}`),
  filter: (type, category, page) =>
    requests.get(
      `/admin/products/filter?type=${type}&&category=${category}&&page=${page}`
    )
};

const ProductCategory = {
  getAll: page => requests.get(`/admin/products/categories?page=${page}`),
  postCategory: data => requests.post(`/admin/product/category`, data),
  del: id => requests.put(`/admin/product/category/${id}`)
};

const Category = {
  getAll: () => requests.get('/admin/categories')
};

const Condition = {
  getAll: page => requests.get(`/admin/conditions?page=${page}`),
  show: id => requests.get(`/admin/conditions/${id}`),
  create: data => requests.post('/admin/conditions', data),
  delete: id => requests.del(`/admin/conditions/${id}`),
  update: (id, data) => requests.put(`/admin/conditions/${id}`, data),
  getAllSelect: () => requests.get(`/admin/condition-array`)
};

const Campaign = {
  getAll: page => requests.get(`/admin/campaigns?page=${page}`),
  delete: id => requests.del(`/admin/campaign/${id}`),
  create: data => requests.post('/admin/campaign', data),
  show: id => requests.get(`/admin/campaign/${id}`),
  filter: (type, page) =>
    requests.get(`/admin/campaigns/filter?type=${type}&&page=${page}`),
  update: (id, data) => requests.put(`/admin/campaign/${id}`, data)
};

const Review = {
  getAll: page => requests.get(`/admin/reviews?page=${page}`),
  block: id => requests.put(`/admin/review/block/${id}`),
  approve: id => requests.put(`/admin/review/approve/${id}`),
  delete: id => requests.del(`/admin/review/${id}`)
};

const Message = {
  getAll: page => requests.get(`/admin/messages?page=${page}`),
  getAllCategory: () => requests.get(`/admin/category-message`),
  show: id => requests.get(`/admin/message/${id}`),
  delete: id => requests.del(`/admin/message/${id}`),
  update: (id, data) => requests.put(`/admin/message/${id}`, data),
  create: data => requests.post('/admin/message', data)
};

const Contact = {
  getAll: page => requests.get(`/admin/contacts?page=${page}`),
  show: id => requests.get(`/admin/contact/${id}`),
  reply: data => requests.post('/admin/contact/reply', data),
  delete: id => requests.del(`/admin/contact/${id}`)
};

const AuctionWinner = {
  getAll: page => requests.get(`/admin/log-auction-winner?page=${page}`),
  auctionWinnerDefault: id =>
    requests.get(`/admin/confirm-auction-winner/${id}`),
  auctionWinnerSuccessful: id =>
    requests.get(`/admin/confirm-auction-winner-success/${id}`),
  auctionWinnerFails: id =>
    requests.get(`/admin/confirm-auction-winner-fails/${id}`),
  filterAuctionWinner: (filter, page) =>
    requests.get(`/admin/log-auction-winner?filter=${filter}&&page=${page}`)
};

const ContactCategory = {
  getAll: page => requests.get(`/admin/contact-categories?page=${page}`),
  create: data => requests.post(`/admin/contact-category`, data),
  detail: id => requests.get(`/admin/contact-category/${id}`),
  update: (id, data) => requests.put(`/admin/contact-category/${id}`, data)
};

const UserChanceBuy = {
  getAll: page => requests.get(`/admin/user-chance-buys?page=${page}`),
  getLog: (id, page) =>
    requests.get(`/admin/log-user-chance-buy/${id}?page=${page}`)
};

export default {
  User,
  setToken: _token => {
    token = _token;
  },
  Auth,
  Auction,
  Product,
  Category,
  Condition,
  Campaign,
  Review,
  Message,
  Contact,
  AuctionWinner,
  ProductCategory,
  ContactCategory,
  UserChanceBuy
};
