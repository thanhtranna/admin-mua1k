import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import {
  filterLogWinner,
  getAuctionWinners,
  onUnload
} from '../../actions/auctionWinnerActions';
import {
  RANGER_PAGINATION,
  STATUS_LOG_AUCTION_WINNER
} from '../../constants/common';
import { LogAuctionWinnerTableRow } from '../../components/common/index';

const mapStateToProps = state => ({
  auctionWinners: state.auctionWinner.auctionWinners,
  total: state.auctionWinner.total,
  limit: state.auctionWinner.limit,
  page: state.auctionWinner.page,
  pages: state.auctionWinner.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getAuctionWinners(page)),
  onUnload: () => dispatch(onUnload()),
  filterLogWinner: (filter, page) => dispatch(filterLogWinner(filter, page))
});

class AuctionWinnerList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.filterLogWinner = this.filterLogWinner.bind(this);
    this.state = {
      isFilter: false,
      valueFilter: null
    };
  }

  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  handlePageChange(pageNumber) {
    if (this.state.isFilter === true) {
      this.props.filterLogWinner(this.state.valueFilter, pageNumber);
    } else {
      this.props.onLoad(pageNumber);
    }
  }

  filterLogWinner(event) {
    event.preventDefault();
    let filter = event.target.value;
    if (filter !== '') {
      this.setState({
        isFilter: true,
        valueFilter: filter
      });
    } else {
      this.setState({ isFilter: false });
    }
    this.props.filterLogWinner(filter);
  }

  render() {
    const { auctionWinners } = this.props;
    if (!auctionWinners) {
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

    const ListAuctionWinner = auctionWinners.map((auctionWinner, index) => (
      <LogAuctionWinnerTableRow
        key={auctionWinner._id}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...auctionWinner}
      />
    ));

    // paginate
    let Paginate = <h1>No data.</h1>;
    if (auctionWinners.length > 0) {
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
            <div className="text-center m-t-lg">
              <select
                className="form-control"
                name="name"
                onChange={this.filterLogWinner}
              >
                <option value="">-------</option>
                {STATUS_LOG_AUCTION_WINNER.map((item, key) => {
                  return (
                    <option key={key} value={item.value}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <br />
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Image</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>{ListAuctionWinner}</tbody>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuctionWinnerList);
