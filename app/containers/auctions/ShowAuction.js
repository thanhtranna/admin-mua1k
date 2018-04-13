import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuction } from '../../actions/auctionActions';
import { checkUndefined, formatDate } from '../../helpers/Helpers';
import { Link } from 'react-router';

const mapStateToProps = state => ({
  auction: state.auctions.auction
});

const mapDispatchToProps = dispatch => ({
  getAuction: id => dispatch(getAuction(id))
});

class ShowAuction extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAuction(this.props.params.id);
  }

  render() {
    const { auction } = this.props;
    if (!auction) {
      return (
        <div className="wrapper wrapper-content">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      );
    }

    const {
      _id,
      aid,
      chanceAvailable,
      chanceNumber,
      expiredAt,
      is1kYen,
      isImmediateBuy,
      product,
      startAt,
      status,
      userChanceBuy,
      winner
    } = auction;

    let txtStatus = '';

    if (status && status === 1) {
      txtStatus = 'waiting';
    }

    if (status && status === 2) {
      txtStatus = 'running';
    }

    if (status && status === 3) {
      txtStatus = 'finished';
    }

    if (status && status === -1) {
      txtStatus = 'failed';
    }

    const check1kYen =
      is1kYen === true
        ? 'Sản phẩm đang đấu giá có thuộc diện 1000yen'
        : 'Sản phẩm đang đấu giá khong thuộc diện 1000yen';

    const checkAcceptBuy =
      isImmediateBuy === true ? 'Buy now' : 'Not purchase it now';

    if (userChanceBuy) {
      const userchanceBuyHtml = userChanceBuy.map(function(user, index) {
        return (
          <div className="col-sm-6">
            <p key={index} className="form-control">
              {user.user.nickname}
            </p>
          </div>
        );
      });

      return (
        <div className="wrapper wrapper-content animated">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center m-t-lg">
                <h1>Show</h1>
                <hr />
                {/*id*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">id</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="form-control">{_id}</p>
                  </div>
                </div>

                {/*aid*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">aid</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="form-control">{aid}</p>
                  </div>
                </div>

                {/*/!*product id*!/*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">Product id</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="form-control">
                      {product ? product._id : 'No Product'}
                    </p>
                  </div>
                </div>

                {/*/!*product name*!/*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">Product Name</p>
                  </div>
                  <div className="col-sm-6">
                    <textarea
                      disabled
                      className="form-control disabledArea"
                      cols="30"
                      rows="10"
                    >
                      {product.name}
                    </textarea>
                  </div>
                </div>
                <br />

                {/*product description*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">Description</p>
                  </div>
                  <div className="col-sm-6">
                    <textarea
                      disabled
                      className="form-control disabledArea"
                      cols="30"
                      rows="10"
                    >
                      {product.description}
                    </textarea>
                  </div>
                </div>
                <br />

                {/*product featureImage*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">Image</p>
                  </div>
                  <div className="col-sm-6">
                    <p>
                      <img
                        className="setImage"
                        src={
                          product.featureImage
                            ? product.featureImage.thumb
                            : 'img/product.png'
                        }
                        alt={product.name}
                      />
                    </p>
                  </div>
                </div>

                {/*product price*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">Price</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="form-control">{product.price}</p>
                  </div>
                </div>

                {/*chanceNumber*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">Chance Number</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="form-control">{chanceNumber}</p>
                  </div>
                </div>

                {/* status*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">Status</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="form-control">{txtStatus}</p>
                  </div>
                </div>

                {/* startAt*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">Start Date</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="form-control">{formatDate(startAt)}</p>
                  </div>
                </div>

                {/* expiredAt*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">ExpiredAt</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="form-control">{formatDate(expiredAt)}</p>
                  </div>
                </div>

                {/* is1kYen*/}
                {/*<div className="row">*/}
                {/*<div className="col-sm-6">*/}
                {/*<p className="form-control">1000 yen</p>*/}
                {/*</div>*/}
                {/*<div className="col-sm-6">*/}
                {/*<p className="form-control">{ check1kYen }</p>*/}
                {/*</div>*/}
                {/*</div>*/}

                {/* isImmediateBuy*/}
                {/*<div className="row">*/}
                {/*<div className="col-sm-6">*/}
                {/*<p className="form-control">Buy Accept</p>*/}
                {/*</div>*/}
                {/*<div className="col-sm-6">*/}
                {/*<p className="form-control">{ checkAcceptBuy }</p>*/}
                {/*</div>*/}
                {/*</div>*/}

                {/* chanceAvailable*/}
                <div className="row">
                  <div className="col-sm-6">
                    <p className="form-control">Chance Available</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="form-control">
                      {chanceAvailable ? chanceAvailable : 0}
                    </p>
                  </div>
                </div>

                {/* winner*/}
                {winner ? (
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="form-control">Winner</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="form-control">{`${
                        winner.user !== undefined ? winner.user.nickname : null
                      } - ChanceBought: ${checkUndefined(
                        winner.chanceBought
                      )}`}</p>
                    </div>
                  </div>
                ) : null}

                {/* userChanceBuy*/}
                {/*<div className="row showDetail">*/}
                {/*<div className="col-sm-6">*/}
                {/*<p className="form-control">Buyer</p>*/}
                {/*</div>*/}
                {/*{ userchanceBuyHtml }*/}
                {/*</div>*/}
                <div className="row">
                  <div className="col-md-12">
                    <Link to="/auctions" className="btn btn-default btn-cancel">
                      Cancel
                    </Link>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAuction);
