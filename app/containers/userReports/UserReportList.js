import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import { getUserReports, onUnLoad } from '../../actions/userReportActions';
import UserReportTableRow from '../../components/common/UserReportTableRow';

const mapStateToProps = state => ({
  userReports: state.userReport.userReports,
  total: state.userReport.total,
  limit: state.userReport.limit,
  page: state.userReport.page,
  pages: state.userReport.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getUserReports(page)),
  onUnLoad: () => dispatch(onUnLoad())
});

class UserReportList extends Component {
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

  handlePageChange(pageNumber) {
    this.props.onLoad(pageNumber);
  }

  render() {
    const { userReports } = this.props;

    if (!userReports) {
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

    const ListUserReport = userReports.map((report, index) => (
      <UserReportTableRow key={index} index={index} {...report} />
    ));

    // paginate
    let Paginate = <h1>No Data.</h1>;
    if (userReports.length > 0) {
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
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">Id</th>
                      <th className="text-center">From User</th>
                      <th className="text-center">To User</th>
                      <th className="text-center">Content</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">UpdatedAt</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{ListUserReport}</tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-12 text-center">{Paginate}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReportList);
