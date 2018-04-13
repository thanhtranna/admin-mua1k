import React, { Component } from 'react';
import { MessageTableRow } from '../../components/common/index';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { getMessages } from '../../actions/messageActions';
import { RANGER_PAGINATION } from '../../constants/common';

const mapStateToProps = state => ({
  messages: state.messages.messages,
  total: state.messages.total,
  limit: state.messages.limit,
  page: state.messages.page,
  pages: state.messages.pages
});

const mapDispatchToProps = dispatch => ({
  getMessages: page => dispatch(getMessages(page))
});

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getMessages();
  }

  handlePageChange(pageNumber) {
    this.props.getMessages(pageNumber);
  }

  render() {
    const { messages } = this.props;
    if (!messages) {
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

    const ListMessages = messages.map((message, index) => (
      <MessageTableRow
        key={index}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...message}
      />
    ));

    // paginate
    let Paginate = <h1>No Data.</h1>;
    if (messages.length > 0) {
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
            {/*<Link to="/messages/create" className="btn btn-primary btn-lg">作成</Link>*/}
            <div className="text-center m-t-lg">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">Title</th>
                      <th className="text-center">Category</th>
                      <th className="text-center">Content</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">DeletedAt</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{ListMessages}</tbody>
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
