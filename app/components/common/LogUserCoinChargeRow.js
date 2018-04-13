import React, { Component } from 'react';
import { formatDate } from '../../helpers/Helpers';

class LogUserCoinChargeRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { _id, user, createdAt, code, coin, money } = this.props;
    return (
      <tr className="text-center">
        <td>{_id}</td>
        <td>{user && user.nickname ? user.nickname : 'Not Found'}</td>
        <td>{coin}</td>
        <td>{money}</td>
        <td>{code}</td>
        <td>{formatDate(createdAt)}</td>
      </tr>
    );
  }
}

export default LogUserCoinChargeRow;
