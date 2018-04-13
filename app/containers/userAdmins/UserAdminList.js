import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import { getUserAdmins, onUnLoad } from '../../actions/userAdminActions';
import UserAdminTableRow from '../../components/common/UserAdminTableRow';

const mapStateToProps = state => ({
  userAdmins: state.userAdmin.userAdmins,
  total: state.userAdmin.total,
  limit: state.userAdmin.limit,
  page: state.userAdmin.page,
  pages: state.userAdmin.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getUserAdmins(page)),
  onUnLoad: () => dispatch(onUnLoad())
});

class UserAdminList extends Component {
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
    const { userAdmins } = this.props;

    if (!userAdmins) {
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

    const ListUserAdmins = userAdmins.map((admin, index) => (
      <UserAdminTableRow
        key={index}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...admin}
      />
    ));

    // paginate
    let Paginate = <h1>No Data.</h1>;
    if (userAdmins.length > 0) {
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
            <Link to="/admin/create" className="btn btn-primary btn-lg">
              Create
            </Link>
            <div className="text-center m-t-lg">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Nickname</th>
                      <th className="text-center">Sex</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">UpdatedAt</th>
                      {/*<th className="text-center">DeletedAt</th>*/}
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{ListUserAdmins}</tbody>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAdminList);
