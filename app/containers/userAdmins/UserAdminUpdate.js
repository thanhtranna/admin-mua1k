import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  onRedirect,
  onUnLoad,
  putUserAdmin
} from '../../actions/userAdminActions';
import ListErrors from '../../components/common/ListErrors';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  errors: state.userAdmin.errors,
  disabled: state.userAdmin.disabled,
  redirectTo: state.userAdmin.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onSave: (id, data) => dispatch(putUserAdmin(id, data)),
  onUnload: () => dispatch(onUnLoad()),
  onRedirect: () => dispatch(onRedirect())
});

class UserAdminUpdate extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.state = {
      admin: {
        password: '',
        confirm_password: ''
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
    this.props.onUnload();
  }

  onSave(event) {
    event.preventDefault();
    this.props.onSave(this.props.params.id, this.state.admin);
  }

  onChangeState(event) {
    event.preventDefault();
    const field = event.target.name;
    const newAdmin = this.state.admin;
    newAdmin[field] = event.target.value;
    return this.setState({
      admin: newAdmin
    });
  }

  render() {
    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <h1>Update</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              <form className="form-horizontal">
                <div className="form-group">
                  <label className="control-label col-sm-2">Password:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      name="password"
                      type="password"
                      required
                      defaultValue={this.state.admin.password}
                      onChange={this.onChangeState}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-sm-2">
                    Confirm Password:
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      name="confirm_password"
                      type="password"
                      required
                      defaultValue={this.state.admin.confirm_password}
                      onChange={this.onChangeState}
                    />
                  </div>
                </div>

                <div className="col-sm-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.onSave}
                    disabled={this.props.disabled}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserAdminUpdate.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdminUpdate);
