import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { getConditions, onUnload } from '../../actions/conditionActions';
import { RANGER_PAGINATION } from '../../constants/common';
import ConditionTableRow from '../../components/common/ConditionTableRow';

const mapStateToProps = state => ({
  conditions: state.conditions.conditions,
  total: state.conditions.total,
  limit: state.conditions.limit,
  page: state.conditions.page,
  pages: state.conditions.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getConditions(page)),
  onUnload: () => dispatch(onUnload())
});

class ConditionList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  handlePageChange(pageNumber) {
    this.props.onLoad(pageNumber);
  }

  render() {
    const { conditions } = this.props;
    if (!conditions) {
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

    const ListCondition = conditions.map((condition, index) => (
      <ConditionTableRow
        key={condition._id}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...condition}
      />
    ));

    // paginate
    let Paginate = <h1>No Data.</h1>;
    if (conditions.length > 0) {
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
            <Link to="/condition/create" className="btn btn-primary btn-lg">
              Create
            </Link>
            <div className="text-center m-t-lg">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">ID</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Value</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">UpdatedAt</th>
                      <th className="text-center">DeletedAt</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>{ListCondition}</tbody>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConditionList);
