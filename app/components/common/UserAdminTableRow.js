import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  checkUndefined,
  displayNumberRecord,
  formatDate
} from '../../helpers/Helpers';

class UserAdminTableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      email,
      nickname,
      gender,
      createdAt,
      updatedAt,
      // deletedAt
      page,
      limit,
      index
    } = this.props;

    let genderStr = null;
    if (gender !== undefined) {
      genderStr = gender === 1 ? 'Male' : 'Female';
    }
    return (
      <tr className="text-center">
        <td>{displayNumberRecord(page, limit, index)}</td>
        <td>{checkUndefined(email)}</td>
        <td>{checkUndefined(nickname)}</td>
        <td>{genderStr}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{formatDate(updatedAt)}</td>
        {/*<td>{ formatDate(deletedAt) }</td>*/}
        <td>
          <div className="btn-group">
            <Link to={`/admin/edit/${id}`} className="btn btn-primary">
              Edit
            </Link>
          </div>
        </td>
      </tr>
    );
  }
}

export default UserAdminTableRow;
