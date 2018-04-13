import React, { Component } from 'react';
import { Link } from 'react-router';
import { formatDate } from '../../helpers/Helpers';

class ContactCategoryTableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, createdAt, updatedAt, deletedAt } = this.props;

    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{formatDate(updatedAt)}</td>
        <td>{formatDate(deletedAt)}</td>
        <td>
          <div className="btn-group">
            {/*<Link to={`/conditions/${_id}`} className="btn btn-info">表示</Link>*/}
            <Link
              to={`/type-contact-category/edit/${id}`}
              className="btn btn-primary"
            >
              Edit
            </Link>
          </div>
        </td>
      </tr>
    );
  }
}

export default ContactCategoryTableRow;
