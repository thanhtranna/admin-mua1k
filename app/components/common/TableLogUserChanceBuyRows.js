import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  checkUndefined,
  displayNumberRecord,
  truncateText
} from '../../helpers/Helpers';

class TableLogUserChanceBuyRows extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { _id, user, auction, luckyNumber, page, limit, index } = this.props;

    return (
      <tbody>
        <tr className="text-center">
          <td>{displayNumberRecord(page, limit, index)}</td>
          <td>
            <Link to={`/user/${user._id}`}>
              {checkUndefined(user.nickname)}
            </Link>
          </td>
          <td>
            <img
              src={
                user.avatar !== undefined ? user.avatar.thumb : 'img/avatar.png'
              }
              width={100}
              height={100}
              alt="No Image"
            />
          </td>
          <td>
            <Link to={`/auction/${auction._id}`}>
              {truncateText(
                auction.product !== undefined ? auction.product.name : null
              )}
            </Link>
          </td>
          <td>{checkUndefined(luckyNumber)}</td>
        </tr>
      </tbody>
    );
  }
}

export default TableLogUserChanceBuyRows;
