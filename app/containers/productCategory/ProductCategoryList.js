import React, { Component } from 'react';
import { Link, Location } from 'react-router';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import { getCategories, onUnLoad } from '../../actions/productCategoryActions';
import ProductCategoryTableRow from '../../components/common/ProductCategoryTableRow';

const mapStateToProps = state => ({
  categories: state.productCategory.categories,
  total: state.productCategory.total,
  limit: state.productCategory.limit,
  page: state.productCategory.page,
  pages: state.productCategory.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getCategories(page)),
  onUnload: () => dispatch(onUnLoad())
});

class ProductCategoryList extends Component {
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
    const { categories } = this.props;
    if (!categories) {
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

    const ListProductCategory = categories.map((cat, index) => (
      <ProductCategoryTableRow
        key={index}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...cat}
      />
    ));

    // paginate
    let Paginate = <h1>No Data.</h1>;
    if (categories.length > 0) {
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
              to="/type-product-category/create"
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
                      <th className="text-center">Icon</th>
                      <th className="text-center">DeletedAt</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">UpdatedAt</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{ListProductCategory}</tbody>
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
  ProductCategoryList
);
