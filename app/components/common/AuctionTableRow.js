import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { agentDelAuction, onBlockAuction } from '../../actions/auctionActions';
import { displayNumberRecord, formatDate } from '../../helpers/Helpers';

const mapStateToProps = state => ({
  resDeleteAuction: state.auctions.resDeleteAuction
});

const mapDispatchToProps = dispatch => ({
  agentDelAuction: id => dispatch(agentDelAuction(id)),
  agentBlockAuction: id => dispatch(onBlockAuction(id))
});

class AuctionTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteAuction = this.deleteAuction.bind(this);
    this.onBlockAuction = this.onBlockAuction.bind(this);
  }

  deleteAuction(event) {
    event.preventDefault();
    const { id } = this.props;
    if (confirm('Are you want delete ?')) {
      this.props.agentDelAuction(id);
    }
  }

  onBlockAuction(event) {
    event.preventDefault();
    const { id } = this.props;
    if (confirm('Are you want block？')) {
      this.props.agentBlockAuction(id);
    }
  }

  render() {
    const {
      id,
      aid,
      chanceNumber,
      expiredAt,
      product,
      startAt,
      deletedAt,
      isBlocked,
      page,
      limit,
      index
    } = this.props;

    let LinkDelete = null,
      LinkBlock = null;
    if (!deletedAt) {
      LinkDelete = (
        <Link to="" onClick={this.deleteAuction} className="btn btn-danger">
          Delete
        </Link>
      );
    }
    if (!isBlocked) {
      LinkBlock = (
        <Link to="" onClick={this.onBlockAuction} className="btn btn-warning">
          Block
        </Link>
      );
    } else {
      LinkBlock = (
        <Link to="" onClick={this.onBlockAuction} className="btn btn-warning">
          UnBlock
        </Link>
      );
    }

    return (
      <tr className="text-center">
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
        {/*<td>{ deletedAt }</td>*/}
        {/*<td>{ isBlocked ?*/}
        {/*<i className="fa fa-check"/> : <i className="fa fa-times"/>}*/}
        {/*</td>*/}
        <td>
          <div className="btn-group">
            <Link to={`/auction/${id}`} className="btn btn-info">
              Show
            </Link>
            {/*<Link to={`/auctions/edit/${id}`} className="btn btn-primary">修正</Link>*/}
            {/*{ LinkDelete }*/}
            {/*{ LinkBlock }*/}
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionTableRow);
