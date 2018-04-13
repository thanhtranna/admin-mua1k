import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCondition } from '../../actions/conditionActions';
import { formatDate } from '../../helpers/Helpers';

const mapStateToProps = state => ({
  condition: state.conditions.condition
});

const mapDispatchToProps = dispatch => ({
  getCondition: id => dispatch(getCondition(id))
});

class ConditionShow extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCondition(this.props.params.id);
  }

  render() {
    const { condition } = this.props;

    if (!condition) {
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
        <hr />
        <div className="row">
          <div className="col-sm-6">
            <p className="form-control">Id</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">{condition._id}</p>
          </div>
        </div>

        {/*title*/}
        <div className="row">
          <div className="col-sm-6">
            <p className="form-control">Name</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">{condition.name}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <p className="form-control">Value</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">{condition.value}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <p className="form-control">CreatedAt</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">
              {condition.createdAt ? formatDate(condition.createdAt) : null}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <p className="form-control">DeletedAt</p>
          </div>
          <div className="col-sm-6">
            <p className="form-control">
              {condition.deletedAt ? formatDate(condition.deletedAt) : null}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionShow);
