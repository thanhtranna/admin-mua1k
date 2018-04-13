import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import OptionList from '../../components/common/OptionList';
import {
  filterAuctionByProduct,
  getAllProducts,
  onUnLoad
} from '../../actions/auctionActions';
import TableHistoryAuctionRows from '../../components/common/TableHistoryAuctionRows';

const mapStateToProps = state => ({
  products: state.auctions.products,
  auctions: state.auctions.auctions || [],
  total: state.auctions.total,
  limit: state.auctions.limit,
  page: state.auctions.page,
  pages: state.auctions.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getAllProducts()),
  onUnload: () => dispatch(onUnLoad()),
  onFilter: (id, page) => dispatch(filterAuctionByProduct(id, page))
});

class HistoryAuctionByProduct extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onFilterProduct = this.onFilterProduct.bind(this);
    this.state = {
      isFilter: false,
      idProduct: ''
    };
  }

  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  handlePageChange(pageNumber) {
    if (this.state.filter.is === true) {
      this.props.onFilter(this.state.idProduct, pageNumber);
    } else {
      this.props.onLoad(pageNumber);
    }
  }

  onFilterProduct(event) {
    event.preventDefault();
    this.setState({ isFilter: true, idProduct: event.target.value });
    this.props.onFilter(event.target.value);
  }

  render() {
    const { products, auctions } = this.props;

    if (!products || !auctions) {
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

    // paginate
    let Paginate = <h1>No Data.</h1>;
    if (auctions.length > 0) {
      Paginate = (
        <Pagination
          activePage={parseInt(this.props.page)}
          itemsCountPerPage={this.props.limit}
          totalItemsCount={this.props.total}
          pageRangeDisplayed={
            this.props.pages > 10 ? RANGER_PAGINATION : this.props.pages
          }
          onChange={::this.handlePageChange}
        />
      );
    }
    let ListAuctions = '';
    if (this.state.isFilter === true) {
      ListAuctions = auctions.map((auction, index) => (
        <TableHistoryAuctionRows
          key={index}
          page={this.props.page}
          limit={this.props.limit}
          index={index}
          {...auction}
        />
      ));
    }

    const ListOptionProducts = products.map((product, index) => (
      <OptionList key={index} {...product} />
    ));

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <select
              className="filter-box-cate form-control"
              onChange={this.onFilterProduct}
            >
              <option value="" selected={true} disabled={true}>
                --product select--
              </option>
              {ListOptionProducts}
            </select>
          </div>
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">id</th>
                      <th className="text-center">aid</th>
                      <th className="text-center">Chance Number</th>
                      <th className="text-center">End Date</th>
                      <th className="text-center">Image</th>
                      <th className="text-center">Start Date</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>{ListAuctions}</tbody>
                </table>
              </div>
              <div className="col-lg-12 text-center">{Paginate}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  HistoryAuctionByProduct
);
