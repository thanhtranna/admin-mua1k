import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { displayNumberRecord, formatDate } from '../../helpers/Helpers';
import {
  logDefault,
  logSuccessful,
  logFails
} from '../../actions/auctionWinnerActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logDefault: id => dispatch(logDefault(id)),
  logSuccessful: id => dispatch(logSuccessful(id)),
  logFails: id => dispatch(logFails(id))
});

class LogAuctionWinnerTableRow extends Component {
  constructor(props) {
    super(props);
    this.logDefault = this.logDefault.bind(this);
    this.logSuccessful = this.logSuccessful.bind(this);
    this.logFails = this.logFails.bind(this);
  }

  logDefault(event) {
    event.preventDefault();
    this.props.logDefault(this.props._id);
  }

  logSuccessful(event) {
    event.preventDefault();
    this.props.logSuccessful(this.props._id);
  }

  logFails(event) {
    event.preventDefault();
    this.props.logFails(this.props._id);
  }

  render() {
    const {
      _id,
      user,
      auction,
      createdAt,
      page,
      limit,
      index,
      statusWinner
    } = this.props;

    let btnHtml = null,
      statusHtml = null;
    if (!statusWinner || (statusWinner && statusWinner === 0)) {
      btnHtml = (
        <Link to="" onClick={this.logDefault} className="btn btn-default">
          Default
        </Link>
      );
      statusHtml = 'Default';
    }

    if (statusWinner && statusWinner === 1) {
      btnHtml = (
        <div>
          <Link to="" onClick={this.logSuccessful} className="btn btn-success">
            Success
          </Link>
          <Link to="" onClick={this.logFails} className="btn btn-warning">
            Failed
          </Link>
        </div>
      );
      statusHtml = 'Transfering';
    }

    if (statusWinner && statusWinner === 2) {
      statusHtml = 'Success';
    }

    if (statusWinner && statusWinner === 3) {
      statusHtml = 'Failed';
    }

    return (
      <tr className="text-center">
        <td>{displayNumberRecord(page, limit, index)}</td>
        <td>{user.nickname ? user.nickname : null}</td>
        <td>{user.email ? user.email : null}</td>
        <td>
          <img
            src={
              auction.product.featureImage
                ? auction.product.featureImage.thumb
                : 'img/product.png'
            }
            width={150}
            height={150}
            alt="image"
          />
        </td>
        <td>{formatDate(createdAt ? createdAt : null)}</td>
        <td>{statusHtml}</td>
        <td>{btnHtml}</td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  LogAuctionWinnerTableRow
);
