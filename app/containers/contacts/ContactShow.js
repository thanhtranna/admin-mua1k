import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { checkUndefined, formatDate } from '../../helpers/Helpers';
import { getContact, onUnLoad } from '../../actions/contactActions';

const mapStateToProps = state => ({
  contact: state.contact.contact
});

const mapDispatchToProps = dispatch => ({
  onLoad: id => dispatch(getContact(id)),
  onUnload: () => dispatch(onUnLoad())
});

class ContactShow extends Component {
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
              <div className="col-lg-6 col-md-6">
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

              <div className="col-lg-6 col-md-6">
                <div className="col-lg-12 col-md-12">
                  <label>Nickname:</label>
                  <p>{checkUndefined(contact.user.nickname)}</p>
                </div>
                <div className="col-lg-12 col-md-12">
                  <label>Email:</label>
                  <p>{checkUndefined(contact.user.email)}</p>
                </div>
                <div className="col-lg-12 col-md-12">
                  <label>CreatedAt:</label>
                  <p>{formatDate(contact.createdAt)}</p>
                </div>
                <div className="col-lg-12 col-md-12">
                  <label>DeletedAt:</label>
                  {<p>{formatDate(contact.deletedAt)}</p>}
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <hr />

                <div className="btn-group">
                  {contact.deletedAt ? (
                    <div className="alert alert-warning">
                      <strong>Warning!</strong> This contact was deleted.
                    </div>
                  ) : (
                    <Link
                      to={`/contact/reply/${contact._id}`}
                      className="btn btn-md btn-success"
                    >
                      Reply
                    </Link>
                  )}
                  <Link to="/contacts" className="btn btn-md btn-primary">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactShow);
