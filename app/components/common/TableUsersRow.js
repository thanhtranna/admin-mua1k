import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { displayNumberRecord, formatDate } from '../../helpers/Helpers';
import { deleteUser, blockUser } from '../../actions/userActions';

const mapStateToProps = state => ({
  disabled: state.users.disabled
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteUser(id)),
  onBlock: id => dispatch(blockUser(id))
});

class TableUsersRow extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    if (confirm('Are you want delete？')) {
      this.props.onDelete(id);
    }
  }

  onBlock(id) {
    if (confirm('Are you want block？\n')) {
      this.props.onBlock(id);
    }
  }

  render() {
    const {
      _id,
      email,
      nickname,
      avatar,
      isVerified,
      isBlocked,
      createdAt,
      updatedAt,
      page,
      limit,
      index
    } = this.props;

    const checkVerified = isVerified ? (
      <i className="fa fa-check" aria-hidden />
    ) : (
      <i className="fa fa-times" aria-hidden />
    );
    const checkBlocked = isBlocked ? (
      <i className="fa fa-check" aria-hidden />
    ) : (
      <i className="fa fa-times" aria-hidden />
    );

    return (
      <tr>
        <td>{displayNumberRecord(page, limit, index)}</td>
        <td>{email ? email : null}</td>
        <td>{nickname ? nickname : null}</td>
        <td>
          <img
            src={avatar && avatar.thumb ? avatar.thumb : 'img/avatar.png'}
            width={150}
            height={150}
            alt="No Image"
          />
        </td>
        <td>{checkVerified}</td>
        <td>{checkBlocked}</td>
        <td>{createdAt ? formatDate(createdAt) : null}</td>
        <td>{updatedAt ? formatDate(updatedAt) : null}</td>
        <td>
          <div className="btn-group">
            <Link to={`/user/${_id}`} className="btn btn-info">
              Show
            </Link>
            {
              <button
                className="btn btn-warning"
                onClick={() => this.onBlock(_id)}
                disabled={this.props.disabled}
              >
                {isBlocked ? 'UnBlock' : 'Block'}
              </button>
            }
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableUsersRow);
