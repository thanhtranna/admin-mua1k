import React, { Component } from 'react';
import {
  checkUndefined,
  displayNumberRecord,
  formatDate
} from '../../helpers/Helpers';

class TableLogProductFavoriteRows extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      user,
      name,
      url,
      createdAt,
      updatedAt,
      page,
      limit,
      index
    } = this.props;

    return (
      <tr className="text-center">
        <td>{displayNumberRecord(page, limit, index)}</td>
        <td>{user && user.nickname ? user.nickname : null}</td>
        <td>{checkUndefined(name)}</td>
        <td>{checkUndefined(url)}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{formatDate(updatedAt)}</td>
      </tr>
    );
  }
}

export default TableLogProductFavoriteRows;
