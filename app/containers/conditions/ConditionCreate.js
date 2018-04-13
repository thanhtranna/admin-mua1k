import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createCondition } from '../../actions/conditionActions';
import ListErrors from '../../components/common/ListErrors';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onCreate: data => dispatch(createCondition(data))
});

class ConditionCreate extends Component {
  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
  }

  onCreate(event) {
    event.preventDefault();
    const { name, value } = this.refs;

    let data = new FormData();
    data.append('name', name.value);
    data.append('value', value.value);
    this.props.onCreate(data);
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
              <form onSubmit={this.onCreate}>
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
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-submit"
                      disabled={this.props.disabled}
                    >
                      Create
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

export default connect(mapStateToProps, mapDispatchToProps)(ConditionCreate);
