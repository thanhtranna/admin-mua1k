import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { checkUndefined, formatDate } from '../../helpers/Helpers';
import { getCampaign, onUnLoad } from '../../actions/campaignActions';

const mapStateToProps = state => ({
  campaign: state.campaigns.campaign
});

const mapDispatchToProps = dispatch => ({
  onLoad: id => dispatch(getCampaign(id)),
  onUnload: () => dispatch(onUnLoad())
});

class CampaignShow extends Component {
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
    const { campaign } = this.props;

    if (!campaign) {
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

    let isStatus = '';
    if (campaign.status !== undefined) {
      isStatus = campaign.status === 0 ? <p>Not Active</p> : <p>Active</p>;
    }

    let isType = '';
    if (campaign.type !== undefined) {
      if (campaign.type === 1) isType = <p>Static</p>;
      if (campaign.type === 2) isType = <p>Dynamic</p>;
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
                    <label className="pull-left left">Content:</label>{' '}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: checkUndefined(campaign.content)
                      }}
                    />
                  </li>
                  <li className="list-group-item text-center">
                    <label className="pull-left left">Status:</label> {isStatus}
                  </li>
                  <li className="list-group-item text-center">
                    <label className="pull-left left">Type:</label> {isType}
                  </li>
                  <li className="list-group-item text-center">
                    <label className="pull-left left">Url:</label>{' '}
                    {checkUndefined(campaign.url)}
                  </li>
                  <li className="list-group-item text-center">
                    <label className="pull-left left">CreatedAt:</label>{' '}
                    {formatDate(campaign.createdAt)}
                  </li>
                  <li className="list-group-item text-center">
                    <label className="pull-left left">UpdatedAt:</label>{' '}
                    {formatDate(campaign.updatedAt)}
                  </li>
                  <li className="list-group-item text-center">
                    <label className="pull-left left">DeletedAt:</label>{' '}
                    {formatDate(campaign.deletedAt)}
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="col-lg-12 col-md-12">
                  <label>バナー:</label>
                  <p>
                    <img
                      src={
                        campaign.banner !== undefined
                          ? campaign.banner.thumb
                          : 'img/campaign.jpg'
                      }
                      className="img-responsive img-thumbnail"
                      width={300}
                      height={300}
                      alt="No Image"
                    />
                  </p>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <Link to="/campaigns" className="btn btn-md btn-default">
                  キャンセル
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignShow);
