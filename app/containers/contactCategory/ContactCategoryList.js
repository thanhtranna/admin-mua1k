import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import {
  getContactCategories,
  onUnLoad
} from '../../actions/contactCategoryActions';
import ContactCategoryTableRow from '../../components/common/ContactCategoryTableRow';

const mapStateToProps = state => ({
  contactCategories: state.contactCategory.contactCategories,
  total: state.contactCategory.total,
  limit: state.contactCategory.limit,
  page: state.contactCategory.page,
  pages: state.contactCategory.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getContactCategories(page)),
  onUnLoad: () => dispatch(onUnLoad())
});

class ContactCategoryList extends Component {
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
    const { contactCategories, page, limit } = this.props;

    if (!contactCategories) {
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

    const ListContactCategory = contactCategories.map((cate, index) => (
      <ContactCategoryTableRow
        key={cate._id}
        page={page}
        limit={limit}
        index={index}
        {...cate}
      />
    ));

    // paginate
    let Paginate = <h1>No Data.</h1>;
    if (contactCategories.length > 0) {
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
            <Link
              to="/type-contact-category/create"
              className="btn btn-primary btn-lg"
            >
              Create
            </Link>
            <div className="text-center m-t-lg">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">UpdatedAt</th>
                      <th className="text-center">DeletedAt</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{ListContactCategory}</tbody>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  ContactCategoryList
);
