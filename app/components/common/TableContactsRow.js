import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  displayNumberRecord,
  formatDate,
  checkUndefined,
  truncateText
} from '../../helpers/Helpers';
import { deleteContact } from '../../actions/contactActions';

const mapStateToProps = state => ({
  disabled: state.contact.disabled
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteContact(id))
});

class TableContactsRow extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    if (confirm('Are you want delete？')) {
      this.props.onDelete(id);
    }
  }

  render() {
    const {
      _id,
      title,
      category,
      user,
      content,
      createdAt,
      deletedAt,
      disabled,
      page,
      limit,
      index
    } = this.props;

    const styleDelete = deletedAt ? 'text-center danger' : 'text-center';

    return (
      <tr className={styleDelete}>
        <td>{displayNumberRecord(page, limit, index)}</td>
        <td>{checkUndefined(title)}</td>
        <td>{category ? checkUndefined(category.name) : 'Not define'}</td>
        <td>{user ? checkUndefined(user.email) : ''}</td>
        <td>{truncateText(content)}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{formatDate(deletedAt)}</td>
        <td>
          <div className="btn-group">
            <Link to={`/contact/${_id}`} className="btn btn-info">
              Show
            </Link>
            {deletedAt ? null : (
              <button
                className="btn btn-danger"
                onClick={() => this.onDelete(_id)}
                disabled={disabled}
              >
                Delete
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContactsRow);
