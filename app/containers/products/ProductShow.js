import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getProduct, onUnload } from '../../actions/productActions';
import { checkUndefined, formatDate } from '../../helpers/Helpers';
import { STATUS_AUCTION } from '../../constants/common';

const mapStateToProps = state => ({
  product: state.product.product
});

const mapDispatchToProps = dispatch => ({
  onLoad: id => dispatch(getProduct(id)),
  onUnload: () => dispatch(onUnload())
});

class ProductShow extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onLoad(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { product } = this.props;
    const marginTop = { 'margin-top': '15px' };

    if (!product) {
      return (
        <div className="wrapper wrapper-content">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1>Loading....</h1>
            </div>
          </div>
        </div>
      );
    }
    let categoryList = '';
    if (product.category) {
      categoryList = product.category.map((cate, index) => {
        return <span key={index}>{cate.name},</span>;
      });
    }

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <h1>Show</h1>
              <hr />
              <div className="col-lg-8 col-md-8">
                <ul className="list-group">
                  <li className="list-group-item text-center">
                    <label className="pull-left left">Name:</label>{' '}
                    {checkUndefined(product.name)}
                  </li>
                  <li className="list-group-item text-center">
                    <label className="pull-left left">Description:</label>{' '}
                    {checkUndefined(product.description)}
                  </li>

                  {product.value ? (
                    <li className="list-group-item text-center">
                      <label className="pull-left left">Value:</label>{' '}
                      {checkUndefined(product.value)}
                    </li>
                  ) : null}

                  <li className="list-group-item text-center">
                    <label className="pull-left left">Chance Number:</label>{' '}
                    {checkUndefined(product.chanceNumber)}
                  </li>

                  <li className="list-group-item text-center">
                    <label className="pull-left left">Quantity:</label>{' '}
                    {checkUndefined(product.quantity)}
                  </li>

                  {product.category ? (
                    <li className="list-group-item text-center">
                      <label className="pull-left left">Price:</label>{' '}
                      {categoryList}
                    </li>
                  ) : null}

                  {product.condition ? (
                    <li className="list-group-item text-center">
                      <label className="pull-left left">Conditions:</label>{' '}
                      {product.condition
                        ? checkUndefined(product.condition.name)
                        : null}
                    </li>
                  ) : null}

                  {product.expDateNumber ? (
                    <li className="list-group-item text-center">
                      <label className="pull-left left">Exp Date:</label>{' '}
                      {checkUndefined(product.expDateNumber)}
                    </li>
                  ) : null}
                  <li className="list-group-item text-center">
                    <label className="pull-left left">CreatedAt:</label>{' '}
                    {formatDate(product.createdAt)}
                  </li>
                  <li className="list-group-item text-center">
                    <label className="pull-left left">更新時日:</label>{' '}
                    {formatDate(product.updatedAt)}
                  </li>
                  <li className="list-group-item text-center">
                    <label className="pull-left left">DeletedAt:</label>{' '}
                    {formatDate(product.deletedAt)}
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="col-lg-12 col-md-12">
                  <label>Feature Image:</label>
                  <p>
                    <img
                      src={
                        product.featureImage !== undefined
                          ? product.featureImage.thumb
                          : 'img/product.png'
                      }
                      className="img-responsive img-thumbnail"
                      width={200}
                      height={200}
                    />
                  </p>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div>
                  <label>Albums:</label>
                </div>
                {product.images.length > 0 ? (
                  product.images.map(image => {
                    return (
                      <div
                        className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                        style={marginTop}
                      >
                        <img
                          src={checkUndefined(image.thumb)}
                          className="img-responsive img-thumbnail"
                          width={250}
                          height={250}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div
                    className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                    style={marginTop}
                  >
                    <img
                      src={checkUndefined(product.images.thumb)}
                      className="img-responsive img-thumbnail"
                      width={250}
                      height={250}
                    />
                  </div>
                )}
              </div>
              <div className="col-lg-12 col-md-12" style={marginTop}>
                <Link to="/products" className="btn btn-md btn-default">
                  Cancel
                </Link>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);
