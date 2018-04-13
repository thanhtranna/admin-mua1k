import React, { Component } from 'react';
import { TableCampaignRow } from '../../components/common/index';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  getCampaigns,
  onFilter,
  onUnLoad
} from '../../actions/campaignActions';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';

const mapStateToProps = state => ({
  campaigns: state.campaigns.campaigns,
  total: state.campaigns.total,
  limit: state.campaigns.limit,
  page: state.campaigns.page,
  pages: state.campaigns.pages
});

const mapDispatchToProps = dispatch => ({
  onGet: page => dispatch(getCampaigns(page)),
  onUnLoad: () => dispatch(onUnLoad()),
  onFilter: (type, page) => dispatch(onFilter(type, page))
});

class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.state = {
      filter: {
        type: ''
      }
    };
  }

  componentDidMount() {
    this.props.onGet();
  }

  componentWillUnmount() {
    this.props.onUnLoad();
  }

  handlePageChange(pageNumber) {
    if (this.state.filter.type === null) {
      this.props.onGet(pageNumber);
    } else {
      this.props.onFilter(this.state.filter.type, pageNumber);
    }
  }

  onFilter(event) {
    event.preventDefault();
    this.setState({ filter: { type: event.target.value } });
    this.props.onFilter(event.target.value);
  }

  render() {
    const { campaigns } = this.props;

    if (!campaigns) {
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

    const ListCampaigns = campaigns.map((campaign, index) => (
      <TableCampaignRow
        key={campaign._id}
        page={this.props.page}
        limit={this.props.limit}
        index={index}
        {...campaign}
      />
    ));

    // paginate
    let Paginate = <h1>No data.</h1>;
    if (campaigns.length > 0) {
      Paginate = (
        <Pagination
          activePage={parseInt(this.props.page)}
          itemsCountPerPage={this.props.limit}
          totalItemsCount={this.props.total}
          pageRangeDisplayed={
            this.props.pages > 10 ? RANGER_PAGINATION : this.props.pages
          }
          onChange={::this.handlePageChange}
        />
      );
    }

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <Link to="/campaigns/create" className="btn btn-primary btn-lg">
              Create
            </Link>
            <div className="text-center m-t-lg">
              <select className="filter-box" onChange={this.onFilter}>
                <option value="">-- please select --</option>
                <option value={0}>Not Active</option>
                <option value={1}>Active</option>
                <option value={2}>static</option>
                <option value={3}>dynamic</option>
              </select>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">Banner</th>
                      <th className="text-center">Type</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">URL</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">UpdatedAt</th>
                      <th className="text-center">DelatedAt</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  {ListCampaigns}
                </table>
              </div>
            </div>
            <div className="col-lg-12 text-center">{Paginate}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
