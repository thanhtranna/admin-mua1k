import React, { Component } from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import {
  onLoadEdit,
  updateAuction,
  onUnLoad
} from '../../actions/auctionActions';
import ListErrors from '../../components/common/ListErrors';
import { STATUS_AUCTION } from '../../constants/common';

const mapStateToProps = state => ({
  auction: state.auctions.auction,
  products: state.auctions.products,
  users: state.auctions.users,
  errors: state.auctions.errors
});

const mapDispatchToProps = dispatch => ({
  onLoad: id => dispatch(onLoadEdit(id)),
  onUnload: () => dispatch(onUnLoad()),
  onSave: (id, data) => dispatch(updateAuction(id, data))
});

class AuctionEdit extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      product: 0,
      chanceNumber: 0,
      status: 0,
      startAt: '',
      finishAt: '',
      expiredAt: '',
      is1kYen: false,
      isImmediateBuy: false,
      luckyNumber: 0
    };
  }

  componentWillMount() {
    this.props.onLoad(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      product: nextProps.auction.product._id,
      chanceNumber: nextProps.auction.chanceNumber || 0,
      status: nextProps.auction.status,
      startAt: nextProps.auction.startAt,
      finishAt: nextProps.auction.finishAt,
      expiredAt: nextProps.auction.expiredAt,
      is1kYen: nextProps.auction.is1kYen || false,
      isImmediateBuy: nextProps.auction.isImmediateBuy || false,
      luckyNumber: nextProps.auction.luckyNumber || 0
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSave(this.props.params.id, this.state);
  }

  handleEdit(event) {
    const auctionChane = this.state;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    auctionChane[name] = value;

    this.setState({
      product: auctionChane.product,
      chanceNumber: auctionChane.chanceNumber,
      status: auctionChane.status,
      startAt: auctionChane.startAt,
      finishAt: auctionChane.finishAt,
      expiredAt: auctionChane.expiredAt,
      is1kYen: auctionChane.is1kYen,
      isImmediateBuy: auctionChane.isImmediateBuy,
      luckyNumber: auctionChane.luckyNumber
    });
  }

  render() {
    const { auction, products, users } = this.props;

    if (!auction || !products || !users) {
      return (
        <div className="wrapper wrapper-content">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      );
    }

    const ProductList = products.map((product, index) => {
      if (product._id === auction.product._id) {
        return (
          <option selected key={index} value={product._id}>
            {product.name}
          </option>
        );
      } else {
        return (
          <option key={index} value={product._id}>
            {product.name}
          </option>
        );
      }
    });

    const StatusList = STATUS_AUCTION.map((status, index) => {
      if (status.stt === this.state.status) {
        return (
          <option selected key={index} value={status.stt}>
            {status.name}
          </option>
        );
      } else {
        return (
          <option key={index} value={status.stt}>
            {status.name}
          </option>
        );
      }
    });

    return (
      <div>
        <h2>Edit</h2>
        <ListErrors errors={this.props.errors} />
        <form className="form-horizontal" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="control-label col-sm-2">Product:</label>
            <div className="col-sm-10">
              <select
                onChange={this.handleEdit}
                name="product"
                className="form-control"
              >
                {ProductList}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2">Chance Number:</label>
            <div className="col-sm-10">
              <input
                type="number"
                defaultValue={this.state.chanceNumber}
                className="form-control"
                name="chanceNumber"
                onChange={this.handleEdit}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2">Status:</label>
            <div className="col-sm-10">
              <select
                name="status"
                className="form-control"
                onChange={this.handleEdit}
              >
                {StatusList}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2">Start Date:</label>
            <div className="col-sm-10">
              <input
                type="date"
                defaultValue={dateFormat(this.state.startAt, 'yyyy-mm-dd')}
                className="form-control"
                onChange={this.handleEdit}
                name="startAt"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2">End Date:</label>
            <div className="col-sm-10">
              <input
                type="date"
                defaultValue={dateFormat(this.state.finishAt, 'yyyy-mm-dd')}
                className="form-control"
                onChange={this.handleEdit}
                name="finishAt"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2">Expired Date:</label>
            <div className="col-sm-10">
              <input
                type="date"
                defaultValue={dateFormat(this.state.expiredAt, 'yyyy-mm-dd')}
                className="form-control"
                onChange={this.handleEdit}
                name="expiredAt"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2">1000 Yen:</label>
            <div className="col-sm-10">
              <input
                type="checkbox"
                checked={this.state.is1kYen}
                className="form-control"
                onChange={this.handleEdit}
                name="is1kYen"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2">Immediate Buy:</label>
            <div className="col-sm-10">
              <input
                type="checkbox"
                checked={this.state.isImmediateBuy}
                className="form-control"
                onChange={this.handleEdit}
                name="isImmediateBuy"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-2">Lucky Number:</label>
            <div className="col-sm-10">
              <input
                type="number"
                defaultValue={this.state.luckyNumber}
                className="form-control"
                onChange={this.handleEdit}
                name="luckyNumber"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default showDetail">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionEdit);
