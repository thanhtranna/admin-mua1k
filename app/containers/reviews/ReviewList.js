import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import { getReviews } from '../../actions/reviewActions';
import TableReviewRows from '../../components/common/TableReviewRows';

const mapStateToProps = state => ({
  reviews: state.review.reviews,
  total: state.review.total,
  limit: state.review.limit,
  page: state.review.page,
  pages: state.review.pages
});

const mapDispatchToProps = dispatch => ({
  onLoadReview: page => dispatch(getReviews(page))
});

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    this.props.onLoadReview();
  }

  handlePageChange(pageNumber) {
    this.props.onLoadReview(pageNumber);
  }

  render() {
    const { reviews } = this.props;

    if (!reviews) {
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
    if (reviews.length > 0) {
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

    const ListReviews = reviews.map((review, index) => (
      <TableReviewRows
        key={index}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...review}
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
                      <th className="text-center">No</th>
                      <th className="text-center">id</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Auction</th>
                      <th className="text-center">Content</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">UpdatedAt</th>
                      <th className="text-center">DeletedAt</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  {ListReviews}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
