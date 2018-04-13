import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  postProductCategory,
  onUnLoad
} from '../../actions/productCategoryActions';

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(postProductCategory(data)),
  onUnload: () => dispatch(onUnLoad())
});

class ProductCategoryCreate extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onSave(event) {
    event.preventDefault();
    const { name, icon } = this.refs;
    let data = new FormData();
    data.append('name', name.value);
    data.append('icon', icon.files[0]);
    this.props.onSubmit(data);
  }

  render() {
    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <h1>Create</h1>
              <hr />
              <form className="form-horizontal" onSubmit={this.onSave}>
                <div className="form-group">
                  <label className="control-label col-sm-2">Name:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      ref="name"
                      type="text"
                      required={true}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-sm-2">Icon:</label>
                  <div className="col-sm-10">
                    <input
                      ref="icon"
                      type="file"
                      required={true}
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-12">
                    <button
                      type="submit"
                      className="btn btn-primary showDetail"
                      disabled={false}
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

export default connect(null, mapDispatchToProps)(ProductCategoryCreate);
