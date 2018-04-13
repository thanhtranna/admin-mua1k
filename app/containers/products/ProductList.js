import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  getProducts,
  onFilter,
  onSearch,
  onUnload
} from '../../actions/productActions';
import TableProductRows from '../../components/common/TableProductRows';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import OptionList from '../../components/common/OptionList';

const mapStateToProps = state => ({
  products: state.product.products,
  categories: state.product.categories,
  total: state.product.total,
  limit: state.product.limit,
  page: state.product.page,
  pages: state.product.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getProducts(page)),
  onUnload: () => dispatch(onUnload()),
  onSearch: (name, page) => dispatch(onSearch(name, page)),
  onFilter: (type, category, page) => dispatch(onFilter(type, category, page))
});

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onFilterOther = this.onFilterOther.bind(this);
    this.onFilterCategory = this.onFilterCategory.bind(this);
    this.state = {
      keySearch: null,
      filter: {
        type: null,
        category: null,
        is: false
      }
    };
  }

  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  handlePageChange(pageNumber) {
    if (this.state.filter.is === true) {
      if (this.state.filter.category === null) {
        this.props.onFilter(this.state.filter.type, null, pageNumber);
      } else {
        this.props.onFilter(
          this.state.filter.type,
          this.state.filter.category,
          pageNumber
        );
      }
    } else if (this.state.keySearch === null) {
      this.props.onLoad(pageNumber);
    } else {
      this.props.onSearch(this.state.keySearch, pageNumber);
    }
  }

  onSearch(event) {
    event.preventDefault();
    this.setState({
      keySearch: event.target.value,
      filter: { type: null, category: null, is: false }
    });
    this.props.onSearch(event.target.value);
  }

  onFilterOther(event) {
    event.preventDefault();
    this.setState({
      filter: { type: event.target.value, category: null, is: true }
    });
    this.props.onFilter(event.target.value);
  }

  onFilterCategory(event) {
    event.preventDefault();
    this.setState({
      filter: { type: 0, category: event.target.value, is: true }
    });
    this.props.onFilter(0, event.target.value);
  }

  render() {
    const { products, categories } = this.props;

    if (!products || !categories) {
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

    // paginate
    let Paginate = <h1>No Data.</h1>;
    if (products.length > 0) {
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

    const ListProducts = products.map((product, index) => (
      <TableProductRows
        key={index}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...product}
      />
    ));

    const ListOptions = categories.map((category, index) => (
      <OptionList key={index} {...category} />
    ));

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <Link to="/products/create" className="btn btn-primary btn-lg">
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
              {/*<select className="filter-box" onChange={this.onFilterOther}>*/}
              {/*<option>all</option>*/}
              {/*<option value={1}>favorite</option>*/}
              {/*<option value={2}>delete</option>*/}
              {/*</select>*/}
              <select
                className="filter-box-cate"
                onChange={this.onFilterCategory}
              >
                {ListOptions}
              </select>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Image</th>
                      <th className="text-center">Content</th>
                      <th className="text-center">Chance Number</th>
                      <th className="text-center">Value</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Category</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">UpdatedAt</th>
                      <th className="text-center">DeletedAt</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  {ListProducts}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
