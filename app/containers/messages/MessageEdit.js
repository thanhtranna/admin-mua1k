import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { onLoadEdit, putMessage } from '../../actions/messageActions';
import ListErrors from '../../components/common/ListErrors';
import CKEditor from 'react-ckeditor-wrapper';
import { STATUS_MESSAGE } from '../../constants/common';

const mapStateToProps = state => ({
  message: state.messages.message,
  categories: state.messages.categories
});

const mapDispatchToProps = dispatch => ({
  getMessage: id => dispatch(onLoadEdit(id)),
  onSubmit: (id, data) => dispatch(putMessage(id, data))
});

class MessageEdit extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.state = {
      ckeDescription: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({
        ckeContent: nextProps.message.description
      });
    }
  }

  componentWillMount() {
    this.props.getMessage(this.props.params.id);
  }

  onSubmit(event) {
    event.preventDefault();
    const description = this.state.ckeContent;
    const { title, category, status } = this.refs;
    let data = new FormData();
    if (description) data.append('description', description);
    if (status.value) data.append('status', status.value);
    if (title.value) data.append('title', title.value);
    if (category.value) data.append('category', category.value);
    this.props.onSubmit(this.props.params.id, data);
  }

  updateContent(value) {
    this.setState({ ckeContent: value });
  }

  render() {
    const { message, categories } = this.props;

    if (message === undefined || categories === undefined) {
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

    const StatusList = STATUS_MESSAGE.map((status, index) => {
      if (status.value === message.status) {
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

    const CategoryList = categories.map((category, index) => {
      if (category.name === message.category.name) {
        return (
          <option selected key={index} value={category._id}>
            {category.name}
          </option>
        );
      } else {
        return (
          <option key={index} value={category._id}>
            {category.name}
          </option>
        );
      }
    });

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="m-t-lg">
              <h1>Edit</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.onSubmit} encType="multipart/form-data">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Title</label>
                    </div>
                    <div className="col-md-10">
                      <input
                        type="text"
                        ref="title"
                        defaultValue={message.title}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Category</label>
                    </div>
                    <div className="col-md-10">
                      <select ref="category" className="form-control">
                        <option value="">- category -</option>
                        {CategoryList}
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
                      <select ref="status" className="form-control">
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
                      Submit
                    </button>
                    <Link to="/messages" className="btn btn-default btn-cancel">
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageEdit);
