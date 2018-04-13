import React, { Component } from 'react';
import { connect } from 'react-redux';
import { blockUser } from '../../actions/userReportActions';
import { formatDate } from '../../helpers/Helpers';

const mapDispatchToProps = dispatch => ({
  onBlock: id => dispatch(blockUser(id)),
  onUnBlock: id => dispatch(blockUser(id))
});

class UserReportTableRow extends Component {
  constructor(props) {
    super(props);
  }

  onBlock(id) {
    if (confirm('Are you want block this user？')) {
      this.props.onBlock(id);
    }
  }

  onUnBlock(id) {
    if (confirm('Are you want unblock this user？')) {
      this.props.onUnBlock(id);
    }
  }

  render() {
    const {
      _id,
      createdAt,
      updatedAt,
      content,
      isHandle,
      toUser,
      fromUser
    } = this.props;

    return (
      <tr className="text-center">
        <td>{_id}</td>
        <td>
          {fromUser && fromUser.nickname ? fromUser.nickname : 'Not found'}
        </td>
        <td>{toUser && toUser.nickname ? toUser.nickname : 'Not found'}</td>
        <td>{content}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{formatDate(updatedAt)}</td>
        <td>
          <div className="btn-group">
            {toUser && toUser.isBlocked && toUser.isBlocked === true ? (
              <button
                className="btn btn-warning"
                onClick={() => this.onUnBlock(toUser._id)}
              >
                UnBlock
              </button>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => this.onBlock(toUser._id)}
              >
                Block
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, mapDispatchToProps)(UserReportTableRow);
