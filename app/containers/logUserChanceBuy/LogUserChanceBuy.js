import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import { getAll, onUnload } from '../../actions/userChanceBuyActions';
import { TableUserChanceBuyRows } from '../../components/common/index';

const mapStateToProps = state => ({
  userChanceBuys: state.userChanceBuy.userChanceBuys,
  total: state.userChanceBuy.total,
  limit: state.userChanceBuy.limit,
  page: state.userChanceBuy.page,
  pages: state.userChanceBuy.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getAll(page)),
  onUnload: () => dispatch(onUnload())
});

class UserChanceBuyList extends Component {
  constructor(props) {
    super(props);
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
    const { userChanceBuys } = this.props;

    if (!userChanceBuys) {
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
    if (userChanceBuys.length > 0) {
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

    const ListUserChanceBuys = userChanceBuys.map((userChanceBuy, index) => (
      <TableUserChanceBuyRows
        key={index}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...userChanceBuy}
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
                      <th className="text-center" rowSpan={2}>
                        No.
                      </th>
                      <th className="text-center" colSpan={2}>
                        User
                      </th>
                      <th className="text-center" rowSpan={2}>
                        Auction
                      </th>
                      <th className="text-center" rowSpan={2}>
                        Number
                      </th>
                      <th className="text-center" rowSpan={2}>
                        Ip
                      </th>
                      <th className="text-center" rowSpan={2}>
                        CreatedAt
                      </th>
                      <th className="text-center" rowSpan={2}>
                        UpdatedAt
                      </th>
                      <th className="text-center" rowSpan={2}>
                        Actions
                      </th>
                    </tr>
                    <tr>
                      <th className="text-center">Nickname</th>
                      <th className="text-center">Image</th>
                    </tr>
                  </thead>
                  {ListUserChanceBuys}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserChanceBuyList);
