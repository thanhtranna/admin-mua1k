import React, { Component } from 'react';
import { Link } from 'react-router';
import { displayNumberRecord, formatDate } from '../../helpers/Helpers';

class TableHistoryAuctionRows extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      aid,
      chanceNumber,
      expiredAt,
      product,
      startAt,
      isBlocked,
      page,
      limit,
      index
    } = this.props;

    return (
      <tr>
        <td>{displayNumberRecord(page, limit, index)}</td>
        <td>{id}</td>
        <td>{aid}</td>
        <td>{chanceNumber}</td>
        <td>{formatDate(expiredAt)}</td>
        <td>
          <img
            className="setImage"
            src={
              product.featureImage === undefined
                ? 'img/product.png'
                : product.featureImage.thumb
            }
            alt={product.name === undefined ? 'No name' : product.name}
          />
        </td>
        <td>{formatDate(startAt)}</td>
        <td>
          {isBlocked ? (
            <i className="fa fa-check" />
          ) : (
            <i className="fa fa-times" />
          )}
        </td>
      </tr>
    );
  }
}

export default TableHistoryAuctionRows;
