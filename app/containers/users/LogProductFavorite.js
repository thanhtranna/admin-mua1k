import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import {
  getLogProductFavorite,
  onUnLoadLogProductFavorite
} from '../../actions/userActions';
import TableLogProductFavoriteRows from '../../components/common/TableLogProductFavoriteRows';

const mapStateToProps = state => ({
  productFavorites: state.users.productFavorites,
  total: state.users.total,
  limit: state.users.limit,
  page: state.users.page,
  pages: state.users.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: (id, page) => dispatch(getLogProductFavorite(id, page)),
  onUnLoad: () => dispatch(onUnLoadLogProductFavorite())
});

class LogProductFavorite extends Component {
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
    const { productFavorites } = this.props;

    if (!productFavorites) {
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

    const ListLogProductFavorite = productFavorites.map((log, index) => (
      <TableLogProductFavoriteRows
        key={index}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...log}
      />
    ));

    // paginate
    let Paginate = <h1>No Data.</h1>;
    if (productFavorites.length > 0) {
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
                      <th className="text-center">No.</th>
                      <th className="text-center">Nickname</th>
                      <th className="text-center">Product</th>
                      <th className="text-center">Url</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">UpdatedAt</th>
                    </tr>
                  </thead>
                  <tbody>{ListLogProductFavorite}</tbody>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogProductFavorite);
