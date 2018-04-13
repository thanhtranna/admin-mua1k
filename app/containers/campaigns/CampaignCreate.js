import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  createCampaign,
  onRedirect,
  onUnLoad
} from '../../actions/campaignActions';
import { imagesPreview } from '../../helpers/Helpers';
import ListErrors from '../../components/common/ListErrors';
import PropTypes from 'prop-types';
import CKEditor from 'react-ckeditor-wrapper';

const mapStateToProps = state => ({
  errors: state.campaigns.errors,
  disabled: state.campaigns.disabled,
  redirectTo: state.campaigns.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onCreate: data => dispatch(createCampaign(data)),
  onRedirect: () => dispatch(onRedirect()),
  onUnload: () => dispatch(onUnLoad())
});

class CampaignCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckeContent: '',
      errors: []
    };

    this.onCreate = this.onCreate.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
    this.setState({ errors: [] });
  }

  onCreate(event) {
    event.preventDefault();
    const content = this.state.ckeContent;
    const { banner, type, url, status } = this.refs;

    let data = new FormData();
    data.append('content', content);
    data.append('status', status.value);
    data.append('type', type.value);
    data.append('url', url.value);
    data.append('banner', banner.files[0]);
    this.props.onCreate(data);
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
              <h1>Create</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              {displayErrorImage}
              <form onSubmit={this.onCreate} encType="multipart/form-data">
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
                        required={true}
                        onChange={this.onChangeImg}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 gallery text-center" />

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Url</label>
                    </div>
                    <div className="col-md-10">
                      <input
                        type="text"
                        ref="url"
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
                      <select
                        ref="type"
                        className="form-control"
                        required={true}
                      >
                        <option value="">- type -</option>
                        <option value="1">static</option>
                        <option value="2">dynamic</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Status</label>
                    </div>
                    <div className="col-md-10">
                      <select
                        ref="status"
                        className="form-control"
                        required={true}
                      >
                        <option value="">- status -</option>
                        <option value="0">not active</option>
                        <option value="1">active</option>
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
                        onChange={this.updateContent}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-10 col-lg-offset-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-submit"
                      disabled={this.props.disabled}
                    >
                      Create
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

CampaignCreate.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignCreate);
