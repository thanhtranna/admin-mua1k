import React, { Component } from 'react';
import { TableUsersRow } from '../../components/common/index';
import { connect } from 'react-redux';
import {
  getUsers,
  onUnload,
  filterUsers,
  onSearch
} from '../../actions/userActions';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';

const mapStateToProps = state => ({
  users: state.users.users,
  total: state.users.total,
  limit: state.users.limit,
  page: state.users.page,
  pages: state.users.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getUsers(page)),
  onUnload: () => dispatch(onUnload()),
  onFilter: (status, page) => dispatch(filterUsers(status, page)),
  onSearch: (value, page) => dispatch(onSearch(value, page))
});

class UserList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      keySearch: null,
      status: null,
      isFilter: false
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
      this.props.onFilter(this.state.status, pageNumber);
    } else if (this.state.keySearch === null) {
      this.props.onLoad(pageNumber);
    } else {
      this.props.onSearch(this.state.keySearch, pageNumber);
    }
  }

  onFilter(event) {
    event.preventDefault();
    this.setState({
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
    const { users } = this.props;

    if (!users) {
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

    const ListUsers = users.map((user, index) => (
      <TableUsersRow
        key={user._id}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...user}
      />
    ));
    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
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
                <option value={1}>All</option>
                <option value={0}>Default</option>
                <option value={2}>Block</option>
                {/*<option value={3}>削除</option>*/}
              </select>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Nickname</th>
                      <th className="text-center">Image</th>
                      <th className="text-center">Verified</th>
                      <th className="text-center">Block Status</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">UpdatedAt</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{ListUsers}</tbody>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
