import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteCategory } from '../../actions/productCategoryActions';
import { displayNumberRecord, formatDate } from '../../helpers/Helpers';

const mapDispatchToProps = dispatch => ({
  delete: id => dispatch(deleteCategory(id))
});

class ProductCategoryTableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete(event) {
    event.preventDefault();
    const { _id } = this.props;
    this.props.delete(_id);
  }

  render() {
    const {
      deletedAt,
      updatedAt,
      createdAt,
      name,
      icon,
      page,
      limit,
      index
    } = this.props;

    let LinkDelete = null;
    if (!deletedAt) {
      LinkDelete = (
        <Link to="" onClick={this.delete} className="btn btn-danger">
          Delete
        </Link>
      );
    }

    return (
      <tr className="text-center">
        <td>{displayNumberRecord(page, limit, index)}</td>
        <td>{name}</td>
        <td>
          <img
            className="setImage"
            src={icon && icon.thumb ? icon.thumb : 'img/category.jpg'}
            alt={name}
          />
        </td>
        <td>{formatDate(deletedAt)}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{formatDate(updatedAt)}</td>
        <td>
          <div className="btn-group">{LinkDelete}</div>
        </td>
      </tr>
    );
  }
}

export default connect(null, mapDispatchToProps)(ProductCategoryTableRow);
