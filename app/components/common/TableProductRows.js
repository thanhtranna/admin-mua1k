import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  checkUndefined,
  displayNumberRecord,
  formatDate,
  truncateText
} from '../../helpers/Helpers';
import { deleteProduct } from '../../actions/productActions';

const mapStateToProps = state => ({
  disabled: state.product.disabled
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteProduct(id))
});

class TableProductRows extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const { _id } = this.props;
    if (confirm('Are you want delete？')) {
      this.props.onDelete(_id);
    }
  }

  render() {
    const {
      _id,
      name,
      featureImage,
      description,
      chanceNumber,
      quantity,
      price,
      category,
      createdAt,
      updatedAt,
      deletedAt,
      page,
      limit,
      index
    } = this.props;

    return (
      <tbody>
        {deletedAt === undefined || deletedAt === null ? (
          <tr className="text-center">
            <td>{displayNumberRecord(page, limit, index)}</td>
            <td>{checkUndefined(name)}</td>
            <td>
              <img
                src={featureImage !== undefined ? featureImage.thumb : null}
                width={150}
                height={150}
                alt="image"
              />
            </td>
            <td>
              {description !== undefined ? truncateText(description) : null}
            </td>
            <td>{checkUndefined(chanceNumber)}</td>
            <td>{checkUndefined(quantity)}</td>
            <td>{checkUndefined(price)}</td>
            <td>{category !== undefined ? category.name : null}</td>
            <td>{formatDate(createdAt)}</td>
            <td>{formatDate(updatedAt)}</td>
            <td>{formatDate(deletedAt)}</td>
            <td>
              <div className="btn-group">
                <Link to={`/product/${_id}`} className="btn btn-info">
                  Show
                </Link>
                <Link to={`/products/edit/${_id}`} className="btn btn-primary">
                  Edit
                </Link>
                {/*<Link className="btn btn-danger" onClick={this.onDelete} disabled={this.props.disabled}>Delete</Link>*/}
              </div>
            </td>
          </tr>
        ) : (
          <tr className="text-center danger">
            <td>{displayNumberRecord(page, limit, index)}</td>
            <td>{checkUndefined(name)}</td>
            <td>
              <img
                src={
                  featureImage !== undefined
                    ? featureImage.thumb
                    : 'img/product.png'
                }
                width={150}
                height={150}
                alt="image"
              />
            </td>
            <td>
              {description !== undefined ? truncateText(description) : null}
            </td>
            <td>{checkUndefined(chanceNumber)}</td>
            <td>{checkUndefined(quantity)}</td>
            <td>{checkUndefined(price)}</td>
            <td>{category !== undefined ? category.name : null}</td>
            <td>{formatDate(createdAt)}</td>
            <td>{formatDate(updatedAt)}</td>
            <td>{formatDate(deletedAt)}</td>
            <td>
              <div className="btn-group">
                <Link to={`/product/${_id}`} className="btn btn-info">
                  Show
                </Link>
                <Link to={`/products/edit/${_id}`} className="btn btn-primary">
                  Edit
                </Link>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableProductRows);
