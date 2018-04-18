import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { displayNumberRecord, formatDate } from '../../helpers/Helpers';
import { delMessage } from '../../actions/messageActions';

const mapStateToProps = state => ({
  disabled: state.messages.disabled
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(delMessage(id))
});

class MessageTableRow extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete(event) {
    event.preventDefault();
    const { id } = this.props;
    if (confirm('Are you want delete？')) {
      this.props.onDelete(id);
    }
  }
  render() {
    const {
      _id,
      title,
      description,
      category,
      status,
      deletedAt,
      page,
      limit,
      index
    } = this.props;
    let LinkDelete = null;

    if (deletedAt === undefined) {
      LinkDelete = (
        <Link to="" onClick={this.onDelete} className="btn btn-danger">
          Delete
        </Link>
      );
    }

    return (
      <tr className="text-center">
        <td>{displayNumberRecord(page, limit, index)}</td>
        <td>{title ? title : null}</td>
        <td>{category ? category.name : null}</td>
        <td>{description ? description : null}</td>
        <td>
          {status ? (
            <i className="fa fa-check" aria-hidden />
          ) : (
            <i className="fa fa-times" aria-hidden />
          )}
        </td>
        <td>{formatDate(deletedAt ? deletedAt : null)}</td>
        <td>
          <div className="btn-group">
            <Link to={`/messages/${_id}`} className="btn btn-info">
              Show
            </Link>
            <Link to={`/messages/edit/${_id}`} className="btn btn-warning">
              Edit
            </Link>
            {LinkDelete}
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageTableRow);
