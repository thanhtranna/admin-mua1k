import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import {
  getLogUserCoinCharge,
  onUnLoadLogUserCoinCharge
} from '../../actions/userActions';
import LogUserCoinChargeRow from '../../components/common/LogUserCoinChargeRow';

const mapStateToProps = state => ({
  logUserCoinCharges: state.logUserCoinCharge.logUserCoinCharges,
  total: state.logUserCoinCharge.total,
  limit: state.logUserCoinCharge.limit,
  page: state.logUserCoinCharge.page,
  pages: state.logUserCoinCharge.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: (id, page) => dispatch(getLogUserCoinCharge(id, page)),
  onUnLoad: () => dispatch(onUnLoadLogUserCoinCharge())
});

class LogUserCoinChargeList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    this.props.onLoad(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onUnLoad();
  }

  handlePageChange(pageNumber) {
    this.props.onLoad(this.props.params.id, pageNumber);
  }

  render() {
    const { logUserCoinCharges } = this.props;

    if (!logUserCoinCharges) {
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

    const ListLogUserCoinCharge = logUserCoinCharges.map((log, index) => (
      <LogUserCoinChargeRow
        key={log._id}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...log}
      />
    ));

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">User</th>
                      <th className="text-center">Coin</th>
                      <th className="text-center">Money</th>
                      <th className="text-center">Code</th>
                      <th className="text-center">CreatedAt</th>
                    </tr>
                  </thead>
                  <tbody>{ListLogUserCoinCharge}</tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <Pagination
                activePage={parseInt(this.props.page)}
                itemsCountPerPage={this.props.limit}
                totalItemsCount={this.props.total}
                pageRangeDisplayed={
                  this.props.pages > 10 ? RANGER_PAGINATION : this.props.pages
                }
                onChange={::this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  LogUserCoinChargeList
);
