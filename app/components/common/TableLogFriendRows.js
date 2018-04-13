import React, { Component } from 'react';
import { Link } from 'react-router';
import { formatDate } from '../../helpers/Helpers';

class TableLogFriendRows extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      _id,
      email,
      nickname,
      avatar,
      isVerified,
      isBlocked,
      deletedAt,
      index
    } = this.props;

    const checkVerified = isVerified ? (
      <i className="fa fa-check" />
    ) : (
      <i className="fa fa-times" />
    );
    const checkBlocked = isBlocked ? (
      <i className="fa fa-check" />
    ) : (
      <i className="fa fa-times" />
    );

    return (
      <tr>
        <td>{index + 1}</td>
        <td>
          <Link to={`/user/${_id}`}>{email ? email : null}</Link>
        </td>
        <td>{nickname ? nickname : null}</td>
        <td>
          <img
            src={avatar && avatar.thumb ? avatar.thumb : null}
            width={150}
            height={150}
            alt="image"
          />
        </td>
        <td>{checkVerified}</td>
        <td>{checkBlocked}</td>
        <td>{formatDate(deletedAt ? deletedAt : null)}</td>
      </tr>
    );
  }
}

export default TableLogFriendRows;
