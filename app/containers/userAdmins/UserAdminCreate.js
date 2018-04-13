import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  onRedirect,
  onUnLoad,
  postUserAdmin
} from '../../actions/userAdminActions';
import ListErrors from '../../components/common/ListErrors';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  errors: state.userAdmin.errors,
  disabled: state.userAdmin.disabled,
  redirectTo: state.userAdmin.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onSave: data => dispatch(postUserAdmin(data)),
  onUnload: () => dispatch(onUnLoad()),
  onRedirect: () => dispatch(onRedirect())
});

class UserAdminCreate extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.state = {
      admin: {
        email: '',
        password: '',
        nickname: '',
        gender: '',
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
    this.props.onSave(this.state.admin);
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
              <h1>Create</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              <form className="form-horizontal">
                <div className="form-group">
                  <label className="control-label col-sm-2">Email:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      required={true}
                      defaultValue={this.state.admin.email}
                      onChange={this.onChangeState}
                    />
                  </div>
                </div>

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

                <div className="form-group">
                  <label className="control-label col-sm-2">Sex:</label>
                  <div className="col-sm-5">
                    <input
                      type="radio"
                      value={0}
                      name="gender"
                      id="female"
                      onChange={this.onChangeState}
                    />{' '}
                    <label htmlFor="female">Female</label>
                  </div>
                  <div className="col-sm-5">
                    <input
                      type="radio"
                      value={1}
                      name="gender"
                      id="male"
                      onChange={this.onChangeState}
                    />{' '}
                    <label htmlFor="male"> Male</label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-sm-2">Nickname:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      name="nickname"
                      type="text"
                      required
                      defaultValue={this.state.admin.nickname}
                      onChange={this.onChangeState}
                    />
                  </div>
                </div>

                <div className="col-sm-12">
                  <button
                    type="submit"
                    className="btn btn-primary showDetail"
                    onClick={this.onSave}
                    disabled={this.props.disabled}
                  >
                    Create
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

UserAdminCreate.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdminCreate);
