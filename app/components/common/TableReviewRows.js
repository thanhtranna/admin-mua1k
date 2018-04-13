import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  displayNumberRecord,
  formatDate,
  truncateText
} from '../../helpers/Helpers';
import {
  approveReview,
  blockReview,
  deletedReview
} from '../../actions/reviewActions';

const mapStateToProps = state => ({
  disabled: state.product.disabled
});

const mapDispatchToProps = dispatch => ({
  onBlock: id => dispatch(blockReview(id)),
  onApprove: id => dispatch(approveReview(id)),
  onDelete: id => dispatch(deletedReview(id))
});

class TableReviewRows extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onBlock = this.onBlock.bind(this);
    this.onApprove = this.onApprove.bind(this);
  }

  onDelete() {
    const { _id } = this.props;
    if (confirm('Are you want delete ？')) {
      this.props.onDelete(_id);
    }
  }

  onBlock() {
    const { _id } = this.props;
    if (confirm('Are you want block ？')) {
      this.props.onBlock(_id);
    }
  }

  onApprove() {
    const { _id } = this.props;
    if (confirm('Are you want approve？')) {
      this.props.onApprove(_id);
    }
  }

  render() {
    const {
      _id,
      createdAt,
      updatedAt,
      deletedAt,
      user,
      auction,
      status,
      content,
      page,
      limit,
      index
    } = this.props;

    let statusHtml = '',
      actionHtml = '';

    if (!deletedAt) {
      if (status === 1) {
        statusHtml = 'Accept';
        actionHtml = (
          <div>
            <Link className="btn btn-warning" onClick={this.onBlock}>
              Block
            </Link>
            <Link className="btn btn-danger" onClick={this.onDelete}>
              Delete
            </Link>
          </div>
        );
      } else if (status === 0) {
        statusHtml = 'Block';
        actionHtml = (
          <div>
            <Link className="btn btn-info" onClick={this.onApprove}>
              Approve
            </Link>
            <Link className="btn btn-danger" onClick={this.onDelete}>
              Delete
            </Link>
          </div>
        );
      } else {
        statusHtml = 'Waiting';
      }

      if (status === 2) {
        actionHtml = (
          <div>
            <Link className="btn btn-warning" onClick={this.onBlock}>
              Block
            </Link>
            <Link className="btn btn-info" onClick={this.onApprove}>
              Approve
            </Link>
            <Link className="btn btn-danger" onClick={this.onDelete}>
              Delete
            </Link>
          </div>
        );
      }
    }

    const styleDelete = deletedAt ? 'text-center danger' : 'text-center';

    return (
      <tbody>
        <tr className={styleDelete}>
          <td>{displayNumberRecord(page, limit, index)}</td>
          <td>{_id}</td>
          <td>{!user ? null : user.nickname}</td>
          <td>{!auction ? null : auction._id}</td>
          <td>{content !== undefined ? truncateText(content) : null}</td>
          <td>{statusHtml}</td>
          <td>{formatDate(createdAt)}</td>
          <td>{formatDate(updatedAt)}</td>
          <td>{formatDate(deletedAt)}</td>
          <td>
            <div className="btn-group">{actionHtml}</div>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableReviewRows);
