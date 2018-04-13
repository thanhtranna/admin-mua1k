import React, { Component } from 'react';
import { AuctionTableRow } from '../../components/common/index';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import {
  filterAuction,
  getAuctions,
  onUnLoad,
  searchAuction
} from '../../actions/auctionActions';
import { RANGER_PAGINATION } from '../../constants/common';

const mapStateToProps = state => ({
  auctions: state.auctions.auctions,
  total: state.auctions.total,
  limit: state.auctions.limit,
  page: state.auctions.page,
  pages: state.auctions.pages
});

const mapDispatchToProps = dispatch => ({
  getAuctions: page => dispatch(getAuctions(page)),
  onFilter: (status, page) => dispatch(filterAuction(status, page)),
  onUnload: () => dispatch(onUnLoad()),
  onSearch: (name, page) => dispatch(searchAuction(name, page))
});

class AuctionList extends Component {
  constructor(props) {
    super(props);
    this.onFilter = this.onFilter.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      keySearch: null,
      status: null,
      isFilter: false
    };
  }

  componentWillMount() {
    this.props.getAuctions();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  handlePageChange(pageNumber) {
    if (this.state.isFilter === true) {
      this.props.onFilter(this.state.status, pageNumber);
    } else if (this.state.keySearch === null) {
      this.props.getAuctions(pageNumber);
    } else {
      this.props.onSearch(this.state.keySearch, pageNumber);
    }
  }

  onFilter(event) {
    event.preventDefault();
    this.setState({
      keySearch: null,
      status: event.target.value,
      isFilter: true
    });
    this.props.onFilter(event.target.value);
  }

  onSearch(event) {
    event.preventDefault();
    this.setState({
      keySearch: event.target.value,
      status: null,
      isFilter: false
    });
    this.props.onSearch(event.target.value);
  }

  render() {
    const { auctions } = this.props;
    if (!auctions) {
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

    const ListAuctions = auctions.map((auction, index) => (
      <AuctionTableRow
        key={index}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...auction}
      />
    ));

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
    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <Link to="/auctions/create" className="btn btn-primary btn-lg">
              Create
            </Link>
            <div className="text-center m-t-lg">
              <div className="form-group">
                <input
                  type="text"
                  onChange={this.onSearch}
                  className="form-control"
                  placeholder="search"
                />
              </div>
              <select className="filter-box" onChange={this.onFilter}>
                <option>all</option>
                <option value={-1}>Failed</option>
                <option value={1}>Waiting</option>
                <option value={2}>Running</option>
                <option value={3}>Finished</option>
              </select>
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
                      {/*<th className="text-center">削除時日</th>*/}
                      {/*<th className="text-center">ブロック状態</th>*/}
                      <th className="text-center">Action</th>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuctionList);
