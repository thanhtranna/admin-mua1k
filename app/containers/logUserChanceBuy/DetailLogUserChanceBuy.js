import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';
import { getLog, onUnload } from '../../actions/userChanceBuyActions';
import { TableLogUserChanceBuyRows } from '../../components/common/index';

const mapStateToProps = state => ({
  logUserChanceBuys: state.userChanceBuy.logUserChanceBuys,
  total: state.userChanceBuy.total,
  limit: state.userChanceBuy.limit,
  page: state.userChanceBuy.page,
  pages: state.userChanceBuy.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: (id, page) => dispatch(getLog(id, page)),
  onUnload: () => dispatch(onUnload())
});

class LogUserChanceBuyList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onLoad(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  handlePageChange(pageNumber) {
    this.props.onLoad(this.props.params.id, pageNumber);
  }

  render() {
    const { logUserChanceBuys } = this.props;

    if (!logUserChanceBuys) {
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
    if (logUserChanceBuys.length > 0) {
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

    const ListLogUserChanceBuyRows = logUserChanceBuys.map(
      (logUserChanceBuy, index) => (
        <TableLogUserChanceBuyRows
          key={index}
          page={this.props.page}
          limit={this.props.limit}
          index={index}
          {...logUserChanceBuy}
        />
      )
    );

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
                        Lucky Number
                      </th>
                    </tr>
                    <tr>
                      <th className="text-center">Nickname</th>
                      <th className="text-center">Image</th>
                    </tr>
                  </thead>
                  {ListLogUserChanceBuyRows}
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
  LogUserChanceBuyList
);
