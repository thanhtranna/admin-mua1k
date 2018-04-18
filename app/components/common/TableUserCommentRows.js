import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  checkUndefined,
  displayNumberRecord,
  formatDate,
  truncateText
} from '../../helpers/Helpers';
import {
  approvedUserComment,
  blockUserComment
} from '../../actions/userCommentActions';

const mapDispatchToProps = dispatch => ({
  onApproved: id => dispatch(approvedUserComment(id)),
  onBlock: id => dispatch(blockUserComment(id))
});

class TableUserCommentRows extends Component {
  constructor(props) {
    super(props);
    this.onApprove = this.onApprove.bind(this);
    this.onBlock = this.onBlock.bind(this);
  }

  onApprove() {
    const { _id } = this.props;
    if (confirm('Are you want approve？')) {
      this.props.onApproved(_id);
    }
  }

  onBlock() {
    const { _id } = this.props;
    if (confirm('Are you want block？')) {
      this.props.onBlock(_id);
    }
  }

  render() {
    const {
      _id,
      user,
      review,
      content,
      status,
      createdAt,
      page,
      limit,
      index
    } = this.props;

    let statusHtml = '',
      actionHtml = '';
    if (status === 0) {
      statusHtml = <td>Block</td>;
      actionHtml = (
        <div>
          <Link className="btn btn-info" onClick={this.onApprove}>
            Accept
          </Link>
        </div>
      );
    }
    if (status === 1) {
      statusHtml = <td>Accept</td>;
      actionHtml = (
        <div>
          <Link className="btn btn-danger" onClick={this.onBlock}>
            Block
          </Link>
        </div>
      );
    }
    if (status === 2) {
      statusHtml = <td>Waiting</td>;
      actionHtml = (
        <div>
          <Link className="btn btn-danger" onClick={this.onBlock}>
            Block
          </Link>
          <Link className="btn btn-info" onClick={this.onApprove}>
            Approve
          </Link>
        </div>
      );
    }

    return (
      <tbody>
        <tr className="text-center">
          <td>{displayNumberRecord(page, limit, index)}</td>
          <td>{checkUndefined(_id)}</td>
          <td>{user && user.nickname ? user.nickname : null}</td>
          <td>{review && review._id ? review._id : null}</td>
          <td>{content ? truncateText(content) : null}</td>
          {statusHtml}
          <td>{formatDate(createdAt)}</td>
          <td>
            <div className="btn-group">{actionHtml}</div>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default connect(null, mapDispatchToProps)(TableUserCommentRows);
