import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAuctionProducts,
  createAuction,
  onUnLoad
} from '../../actions/auctionActions';
import ListErrors from '../../components/common/ListErrors';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mapStateToProps = state => ({
  products: state.auctions.products,
  errors: state.auctions.errors
});

const mapDispatchToProps = dispatch => ({
  onProductAuctions: () => dispatch(getAuctionProducts()),
  onCreate: data => dispatch(createAuction(data)),
  onUnload: () => dispatch(onUnLoad())
});

class AuctionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auction: {
        product: '',
        startAt: moment(),
        keyword: ''
      }
    };

    this.onCreateAuction = this.onCreateAuction.bind(this);
    this.uploadAuctionState = this.uploadAuctionState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.onProductAuctions();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onCreateAuction(event) {
    event.preventDefault();
    this.props.onCreate(this.state.auction);
  }

  uploadAuctionState(event) {
    const field = event.target.name;
    const auction = this.state.auction;
    auction[field] = event.target.value;
    return this.setState({
      auction: auction
    });
  }

  handleChange(date) {
    this.setState({
      auction: {
        startAt: date
      }
    });
  }

  render() {
    const { products } = this.props;
    if (!products) {
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

    const ProductList = products.map((product, index) => (
      <option key={index} value={product._id}>
        {product.name}
      </option>
    ));

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <h1>Create</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              <form className="form-horizontal" action="">
                <div className="form-group">
                  <label className="control-label col-sm-2">Product:</label>
                  <div className="col-sm-10">
                    <select
                      required={true}
                      value={this.state.auction.product}
                      onChange={this.uploadAuctionState}
                      name="product"
                      className="form-control"
                    >
                      <option value="" disabled={true}>
                        --Product selection--
                      </option>
                      {ProductList}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-sm-2">Start Date:</label>
                  <div className="col-sm-10 text-left">
                    <DatePicker
                      className="form-control"
                      selected={this.state.auction.startAt}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-sm-2">Keyword:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      onChange={this.uploadAuctionState}
                      name="keyword"
                      type="text"
                      defaultValue={this.state.auction.keyword}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-12">
                    <button
                      type="submit"
                      onClick={this.onCreateAuction}
                      className="btn btn-primary showDetail"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionCreate);
