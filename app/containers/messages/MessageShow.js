import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessage } from '../../actions/messageActions';
import { formatDate } from '../../helpers/Helpers';

const mapStateToProps = state => ({
  message: state.messages.message
});

const mapDispatchToProps = dispatch => ({
  getMessage: id => dispatch(getMessage(id))
});

class MessageShow extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getMessage(this.props.params.id);
  }

  render() {
    const { message } = this.props;

    if (!message) {
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
      <div className="container">
        <h1>Show</h1>

        {/*id*/}
        <div className="row">
          <div className="col-sm-6">
            <p className="form-control">id</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">{message._id}</p>
          </div>
        </div>

        {/*title*/}
        <div className="row">
          <div className="col-sm-6">
            <p className="form-control">Title</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">{message.title}</p>
          </div>
        </div>

        {/*/!*message category*!/*/}
        <div className="row">
          <div className="col-sm-6">
            <p className="form-control">Category</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">{message.category.name}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <p className="form-control">DeletedAt</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">
              {message.deletedAt ? formatDate(message.deletedAt) : null}
            </p>
          </div>
        </div>

        {/*message description*/}
        <div className="row">
          <div className="col-sm-6">
            <p className="form-control">Description</p>
          </div>
          <div className="col-sm-6">
            <textarea
              disabled
              className="form-control disabledArea"
              cols="30"
              rows="10"
            >
              {message.description ? message.description : null}
            </textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageShow);
