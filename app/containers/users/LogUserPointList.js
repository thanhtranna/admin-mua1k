import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import { getLogUserPoint, onUnload } from '../../actions/userActions';
import LogUserPointRow from '../../components/common/LogUserPointRow';

const mapStateToProps = state => ({
  logUserPoints: state.users.logUserPoints,
  total: state.users.total,
  limit: state.users.limit,
  page: state.users.page,
  pages: state.users.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getLogUserPoint(page)),
  onUnLoad: () => dispatch(onUnload())
});

class LogUserPointList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnLoad();
  }

  handlePageChange(page) {
    this.props.onLoad(page);
  }

  render() {
    const { logUserPoints } = this.props;

    if (!logUserPoints) {
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

    const ListLogUserPoint = logUserPoints.map((log, index) => (
      <LogUserPointRow
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
                      <th className="text-center">Point</th>
                      <th className="text-center">Task</th>
                      <th className="text-center">From User</th>
                      <th className="text-center">Start date</th>
                    </tr>
                  </thead>
                  <tbody>{ListLogUserPoint}</tbody>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogUserPointList);
