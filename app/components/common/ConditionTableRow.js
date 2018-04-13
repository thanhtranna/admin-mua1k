import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { displayNumberRecord, formatDate } from '../../helpers/Helpers';
import { delCondition } from '../../actions/conditionActions';

const mapStateToProps = state => ({
  disabled: state.conditions.disabled
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(delCondition(id))
});

class ConditionTableRow extends Component {
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
      name,
      value,
      createdAt,
      updatedAt,
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
        <td>{_id ? _id : null}</td>
        <td>{name ? name : null}</td>
        <td>{value ? value : null}</td>
        <td>{formatDate(createdAt ? createdAt : null)}</td>
        <td>{formatDate(updatedAt ? updatedAt : null)}</td>
        <td>{formatDate(deletedAt ? deletedAt : null)}</td>
        <td>
          <div className="btn-group">
            <Link to={`/conditions/${_id}`} className="btn btn-info">
              {' '}
              Show
            </Link>
            <Link to={`/conditions/edit/${_id}`} className="btn btn-warning">
              {' '}
              Edit
            </Link>
            {LinkDelete}
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionTableRow);
