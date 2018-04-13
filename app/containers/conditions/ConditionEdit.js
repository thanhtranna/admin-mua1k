import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  getCondition,
  putCondition,
  onUnload
} from '../../actions/conditionActions';
import ListErrors from '../../components/common/ListErrors';

const mapStateToProps = state => ({
  condition: state.conditions.condition
});

const mapDispatchToProps = dispatch => ({
  getCondition: id => dispatch(getCondition(id)),
  onSubmit: (id, data) => dispatch(putCondition(id, data)),
  onUnload: () => dispatch(onUnload())
});

class ConditionEdit extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getCondition(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onSubmit(event) {
    event.preventDefault();
    const { name, value } = this.refs;
    let data = new FormData();
    if (name.value) data.append('name', name.value);
    if (value.value) data.append('value', value.value);
    this.props.onSubmit(this.props.params.id, data);
  }

  render() {
    const { condition } = this.props;

    if (condition === undefined) {
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
            <div className="text-center m-t-lg">
              <h1>Edit</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Name</label>
                    </div>
                    <div className="col-md-10">
                      <input
                        type="text"
                        ref="name"
                        className="form-control"
                        required={true}
                        defaultValue={condition.name}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label>Value</label>
                    </div>
                    <div className="col-md-10">
                      <input
                        type="text"
                        ref="value"
                        className="form-control"
                        required={true}
                        defaultValue={condition.value}
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
                      Edit
                    </button>
                    <Link
                      to="/conditions"
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

export default connect(mapStateToProps, mapDispatchToProps)(ConditionEdit);
