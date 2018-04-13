import React, { Component } from 'react';
import { displayNumberRecord, formatDate } from '../../helpers/Helpers';

class LogUserPointRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      _id,
      user,
      createdAt,
      point,
      task,
      from,
      page,
      limit,
      index
    } = this.props;

    return (
      <tr className="text-center">
        <td>{displayNumberRecord(page, limit, index)}</td>
        <td>{user && user.nickname ? user.nickname : null}</td>
        <td>{point}</td>
        <td>{task ? task._id : null}</td>
        <td>{from && from.nickname ? from.nickname : null}</td>
        <td>{formatDate(createdAt)}</td>
      </tr>
    );
  }
}

export default LogUserPointRow;
