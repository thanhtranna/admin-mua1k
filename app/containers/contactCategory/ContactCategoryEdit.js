import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getContactCategory,
  onUnLoad,
  update
} from '../../actions/contactCategoryActions';
import ListErrors from '../../components/common/ListErrors';

const mapStateToProps = state => ({
  contactCategory: state.contactCategory.contactCategory,
  errors: state.contactCategory.errors,
  disabled: state.contactCategory.disabled,
  redirectTo: state.contactCategory.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: id => dispatch(getContactCategory(id)),
  onUnLoad: () => dispatch(onUnLoad()),
  onUpdate: (id, data) => dispatch(update(id, data))
});

class ContactCategoryEdit extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    this.props.onLoad(this.props.params.id);
  }

  onSave(event) {
    event.preventDefault();
    const { name } = this.refs;
    let data = new FormData();
    if (name.value) data.append('name', name.value);
    this.props.onUpdate(this.props.params.id, data);
  }

  render() {
    const { contactCategory } = this.props;
    if (!contactCategory) {
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
              <form className="form-horizontal" onSubmit={this.onSave}>
                <div className="form-group">
                  <label className="control-label col-sm-2">Name:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={contactCategory.name}
                      ref="name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-12">
                    <button
                      type="submit"
                      className="btn btn-primary showDetail"
                    >
                      Edit
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

export default connect(mapStateToProps, mapDispatchToProps)(
  ContactCategoryEdit
);
