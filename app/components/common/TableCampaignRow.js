import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { displayNumberRecord, formatDate } from '../../helpers/Helpers';
import { deleteCampaign } from '../../actions/campaignActions';

const mapStateToProps = state => ({
  disabled: state.campaigns.disabled
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteCampaign(id))
});

class TableCampaignsRow extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    if (confirm('Are you want delete ？')) {
      this.props.onDelete(id);
    }
  }

  render() {
    const {
      _id,
      type,
      banner,
      status,
      url,
      createdAt,
      updatedAt,
      deletedAt,
      page,
      limit,
      index
    } = this.props;

    const styleDelete = deletedAt ? 'text-center danger' : 'text-center';

    return (
      <tbody>
        <tr className={styleDelete}>
          <td>{displayNumberRecord(page, limit, index)}</td>
          <td>
            <img
              src={banner.thumb ? banner.thumb : 'img/campaign.jpg'}
              width={150}
              height={150}
              alt="No Image"
            />
          </td>
          <td>{type === 1 ? 'スタティック' : 'ダイナミック'}</td>
          <td>{status ? 'Active' : 'Un Active'}</td>
          <td>{url ? url : null}</td>
          <td>{formatDate(createdAt)}</td>
          <td>{formatDate(updatedAt)}</td>
          <td>{formatDate(deletedAt)}</td>
          <td>
            <div className="btn-group">
              <Link to={`/campaign/${_id}`} className="btn btn-info">
                Show
              </Link>
              <Link to={`/campaigns/edit/${_id}`} className="btn btn-primary">
                Edit
              </Link>
              {deletedAt ? null : (
                <button
                  className="btn btn-danger"
                  onClick={() => this.onDelete(_id)}
                  disabled={this.props.disabled}
                >
                  Delete
                </button>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableCampaignsRow);
