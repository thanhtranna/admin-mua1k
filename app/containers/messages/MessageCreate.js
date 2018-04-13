import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createMessage, getCategories } from '../../actions/messageActions';
import CKEditor from 'react-ckeditor-wrapper';
import ListErrors from '../../components/common/ListErrors';

const mapStateToProps = state => ({
  categories: state.messages.categories
});

const mapDispatchToProps = dispatch => ({
  onCreate: data => dispatch(createMessage(data)),
  onGetCategories: () => dispatch(getCategories())
});

class MessageCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckeDescription: ''
    };

    this.onCreate = this.onCreate.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  updateContent(value) {
    this.setState({ ckeContent: value });
  }

  componentDidMount() {
    this.props.onGetCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  onCreate(event) {
    event.preventDefault();
    const { title, category } = this.refs;
    const description = this.state.ckeContent;

    let data = new FormData();
    data.append('title', title.value);
    data.append('description', description);
    data.append('category', category.value);
    this.props.onCreate(data);
  }

  render() {
    const { categories } = this.props;
    if (categories === undefined) {
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

    const CategoryList = categories.map((category, index) => {
      return (
        <option key={index} value={category._id}>
          {category.name}
        </option>
      );
    });

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="m-t-lg">
              <h1>Create</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.onCreate}>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Title</label>
                    </div>
                    <div className="col-md-10">
                      <input
                        type="text"
                        ref="title"
                        className="form-control"
                        required={true}
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
                      <select
                        ref="category"
                        className="form-control"
                        required={true}
                      >
                        <option value="">- category -</option>
                        {CategoryList}
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageCreate);
