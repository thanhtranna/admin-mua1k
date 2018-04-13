import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { checkUndefined } from '../../helpers/Helpers';
import ListErrors from '../../components/common/ListErrors';
import {
  getContact,
  onUnLoad,
  onRedirect,
  replyContact
} from '../../actions/contactActions';
import CKEditor from 'react-ckeditor-wrapper';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  contact: state.contact.contact,
  errors: state.contact.errors,
  disabled: state.contact.disabled,
  redirectTo: state.contact.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: id => dispatch(getContact(id)),
  onUnload: () => dispatch(onUnLoad()),
  onRedirect: () => dispatch(onRedirect()),
  onReply: data => dispatch(replyContact(data))
});

class ContactShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckeContent: ''
    };
    this.updateContent = this.updateContent.bind(this);
    this.onReply = this.onReply.bind(this);
  }

  componentWillMount() {
    this.props.onLoad(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  updateContent(value) {
    this.setState({ ckeContent: value });
  }

  onReply(event) {
    event.preventDefault();
    const content = this.state.ckeContent;
    const { title, nickname, email } = this.refs;

    if (content === '') return false;

    let data = new FormData();
    data.append('title', title.value);
    data.append('nickname', nickname.value);
    data.append('email', email.value);
    data.append('content', content);
    this.props.onReply(data);
  }

  render() {
    const { contact } = this.props;

    if (!contact) {
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

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="m-t-lg">
              <h1>Contact detail</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.onReply}>
                <div className="col-lg-6 col-md-6">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <label>Title:</label>
                      <input
                        type="text"
                        className="form-control"
                        ref="title"
                        required={true}
                      />
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <label>Content:</label>
                      <CKEditor
                        value={this.state.ckeContent}
                        onChange={this.updateContent}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="col-lg-12 col-md-12">
                    <label>User:</label>
                    <p>{checkUndefined(contact.user.nickname)}</p>
                    <input
                      type="hidden"
                      value={contact.user.nickname}
                      ref="nickname"
                    />
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <label>User's Email:</label>
                    <p>{checkUndefined(contact.user.email)}</p>
                    <input
                      type="hidden"
                      value={contact.user.nickname}
                      ref="email"
                    />
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <label>Title:</label>
                    <p>{checkUndefined(contact.title)}</p>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <label>Category:</label>
                    <p>{checkUndefined(contact.category.name)}</p>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <label>Content:</label>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: checkUndefined(contact.content)
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-12 col-md-12">
                  <hr />
                  <div className="btn-group">
                    <button
                      title="submit"
                      className="btn btn-md btn-success"
                      disabled={this.props.disabled}
                    >
                      Reply
                    </button>
                    <Link
                      to={`/contact/${contact._id}`}
                      className="btn btn-md btn-primary"
                      disabled={this.props.disabled}
                    >
                      Back
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

ContactShow.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactShow);
