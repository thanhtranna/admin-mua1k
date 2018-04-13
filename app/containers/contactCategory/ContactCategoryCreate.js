import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  onUnLoad,
  createContactCategory,
  onRedirect
} from '../../actions/contactCategoryActions';
import ListErrors from '../../components/common/ListErrors';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  errors: state.contactCategory.errors,
  disabled: state.contactCategory.disabled,
  redirectTo: state.contactCategory.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onSave: data => dispatch(createContactCategory(data)),
  onUnLoad: () => dispatch(onUnLoad()),
  onRedirect: () => dispatch(onRedirect())
});

class ContactCategoryCreate extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.state = {
      contactCategory: {
        name: ''
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillUnmount() {
    this.props.onUnLoad();
  }

  onSave(event) {
    event.preventDefault();
    this.props.onSave(this.state.contactCategory);
  }

  onChangeState(event) {
    event.preventDefault();
    const field = event.target.name;
    const dataCreate = this.state.contactCategory;
    dataCreate[field] = event.target.value;
    return this.setState({
      contactCategory: dataCreate
    });
  }

  render() {
    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <h1>Create</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              <form className="form-horizontal" onSubmit={this.onSave}>
                <div className="form-group">
                  <label className="control-label col-sm-2">Name:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      name="name"
                      type="text"
                      required={true}
                      defaultValue={this.state.contactCategory.name}
                      onChange={this.onChangeState}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-12">
                    <button
                      type="submit"
                      className="btn btn-primary showDetail"
                      disabled={this.props.disabled}
                    >
                      Create
                    </button>
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

ContactCategoryCreate.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ContactCategoryCreate
);
