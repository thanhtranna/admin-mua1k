import React, { Component } from 'react';
import {
  checkUndefined,
  displayNumberRecord,
  formatDate
} from '../../helpers/Helpers';

class LogDiscountTicketRows extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      _id,
      user,
      product,
      expiredAt,
      createdAt,
      updatedAt,
      deletedAt,
      page,
      limit,
      index
    } = this.props;

    return (
      <tr className="text-center">
        <td>{displayNumberRecord(page, limit, index)}</td>
        <td>{checkUndefined(_id)}</td>
        <td>{user && user.nickname ? user.nickname : null}</td>
        <td>{product && product.name ? product.name : null}</td>
        <td>{formatDate(expiredAt)}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{formatDate(updatedAt)}</td>
        <td>{formatDate(deletedAt)}</td>
      </tr>
    );
  }
}

export default LogDiscountTicketRows;
