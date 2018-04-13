import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import { getUserComments } from '../../actions/userCommentActions';
import TableUserCommentRows from '../../components/common/TableUserCommentRows';

const mapStateToProps = state => ({
  comments: state.userComment.comments,
  total: state.userComment.total,
  limit: state.userComment.limit,
  page: state.userComment.page,
  pages: state.userComment.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getUserComments(page))
});

class UserCommentList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    this.props.onLoad();
  }

  handlePageChange(pageNumber) {
    this.props.onLoad(pageNumber);
  }

  render() {
    const { comments } = this.props;

    if (!comments) {
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
    if (comments.length > 0) {
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

    const ListUserComment = comments.map((comment, index) => (
      <TableUserCommentRows
        key={index}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...comment}
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
                      <th className="text-center">Id</th>
                      <th className="text-center">Nickname</th>
                      <th className="text-center">ID Review</th>
                      <th className="text-center">Content</th>
                      <th className="text-center">status</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  {ListUserComment}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserCommentList);
