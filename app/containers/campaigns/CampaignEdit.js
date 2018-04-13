import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  onLoadEdit,
  onRedirect,
  onUnLoad,
  putCampaign
} from '../../actions/campaignActions';
import { checkUndefined, imagesPreview } from '../../helpers/Helpers';
import ListErrors from '../../components/common/ListErrors';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-wrapper';
import { STATUS_CAMPAIGN, TYPE_CAMPAIGN } from '../../constants/common';

const mapStateToProps = state => ({
  campaign: state.campaigns.campaign,
  errors: state.campaigns.errors,
  disabled: state.campaigns.disabled,
  redirectTo: state.campaigns.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: id => dispatch(onLoadEdit(id)),
  onSubmit: (id, data) => dispatch(putCampaign(id, data)),
  onUnload: () => dispatch(onUnLoad()),
  onRedirect: () => dispatch(onRedirect())
});

class CampaignEdit extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.state = {
      ckeContent: '',
      errors: []
    };
  }

  componentWillMount() {
    this.props.onLoad(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onUnload();
    this.setState({ errors: [] });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }

    if (nextProps.campaign) {
      this.setState({
        ckeContent: nextProps.campaign.content
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const content = this.state.ckeContent;
    const { banner, type, url, status } = this.refs;

    let data = new FormData();
    if (content) data.append('content', content);
    if (status.value) data.append('status', status.value);
    if (type.value) data.append('type', type.value);
    if (url.value) data.append('url', url.value);
    if (banner.value) {
      data.append('isFile', true);
      data.append('banner', banner.files[0]);
    }
    this.props.onSubmit(this.props.params.id, data);
  }

  onChangeImg(event) {
    event.preventDefault();
    const { banner } = this.refs;
    const errors = imagesPreview(banner, 'div.gallery');
    this.setState({ errors: errors });
  }

  updateContent(value) {
    this.setState({ ckeContent: value });
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

    const StatusList = STATUS_CAMPAIGN.map((status, index) => {
      if (status.value === campaign.status) {
        return (
          <option selected key={index} value={status.value}>
            {status.name}
          </option>
        );
      } else {
        return (
          <option key={index} value={status.value}>
            {status.name}
          </option>
        );
      }
    });

    const TypeList = TYPE_CAMPAIGN.map((type, index) => {
      if (type.value === campaign.type) {
        return (
          <option selected key={index} value={type.value}>
            {type.name}
          </option>
        );
      } else {
        return (
          <option key={index} value={type.value}>
            {type.name}
          </option>
        );
      }
    });

    const errorImages = this.state.errors;
    const style = { 'list-style-type': 'none' };
    let displayErrorImage = '';
    if (errorImages.length > 0) {
      displayErrorImage = (
        <ul className="alert alert-danger fade in" style={style}>
          <li>{`Out of range`}</li>
        </ul>
      );
    }

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <h1>Edit</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              {displayErrorImage}
              <form onSubmit={this.onSubmit} encType="multipart/form-data">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Banner</label>
                    </div>
                    <div className="col-md-10">
                      <input
                        type="file"
                        ref="banner"
                        accept="image/*"
                        onChange={this.onChangeImg}
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 gallery text-center">
                      {campaign.banner.length > 0 ? (
                        campaign.banner.map((image, key) => {
                          return (
                            <img
                              key={key}
                              src={image.thumb}
                              className="img-responsive img-thumbnail"
                              width={250}
                              height={250}
                            />
                          );
                        })
                      ) : (
                        <img
                          src={checkUndefined(campaign.banner.thumb)}
                          className="img-responsive img-thumbnail"
                          width={250}
                          height={250}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Url</label>
                    </div>
                    <div className="col-md-10">
                      <input
                        type="text"
                        ref="url"
                        defaultValue={campaign.url}
                        className="form-control"
                        required={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Type</label>
                    </div>
                    <div className="col-md-10">
                      <select ref="type" className="form-control">
                        <option value="">- type -</option>
                        {TypeList}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>State</label>
                    </div>
                    <div className="col-md-10">
                      <select ref="status" className="form-control">
                        <option value="">- state -</option>
                        {StatusList}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Content</label>
                    </div>
                    <div className="col-md-10">
                      <CKEditor
                        value={this.state.ckeContent}
                        ref="content"
                        onChange={this.updateContent}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-submit"
                      disabled={this.props.disabled}
                    >
                      Edit
                    </button>
                    <Link
                      to="/campaigns"
                      className="btn btn-default btn-cancel"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CampaignEdit.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignEdit);
