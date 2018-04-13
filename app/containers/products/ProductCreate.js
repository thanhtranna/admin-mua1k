import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  getCategoriesAndConditions,
  onRedirect,
  onUnload,
  postProduct
} from '../../actions/productActions';
import { checkUndefined, imagesPreview } from '../../helpers/Helpers';
import ListErrors from '../../components/common/ListErrors';
import PropTypes from 'prop-types';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

const mapStateToProps = state => ({
  categories: state.product.categories,
  conditions: state.product.conditions,
  errors: state.product.errors,
  disabled: state.product.disabled,
  redirectTo: state.product.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getCategoriesAndConditions()),
  onUnload: () => dispatch(onUnload()),
  onSubmit: data => dispatch(postProduct(data)),
  onRedirect: () => dispatch(onRedirect())
});

class ProductCreate extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.logChange = this.logChange.bind(this);
    this.state = {
      checked: false,
      valueSelect: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onChange(event) {
    event.preventDefault();
    const { images } = this.refs;
    imagesPreview(images, 'div.gallery');
  }

  onSubmit(event) {
    event.preventDefault();
    const {
      name,
      description,
      value,
      quantity,
      price,
      expDateNumber,
      // condition,
      images
    } = this.refs;

    const category = this.state.valueSelect;

    let data = new FormData();
    data.append('name', name.value);
    data.append('description', description.value);
    if (value.value) data.append('value', value.value);
    data.append('quantity', quantity.value);
    data.append('price', price.value);
    // if (this.state.checked!==null) data.append('isFavorite', this.state.checked);
    if (expDateNumber.value) data.append('expDateNumber', expDateNumber.value);
    data.append('category', category);
    // if (condition.value) data.append('condition', condition.value);
    for (let i = 0; i < images.files.length; i++) {
      data.append('images', images.files[i]);
    }

    this.props.onSubmit(data);
  }

  handleChangeCheck() {
    this.setState({
      checked: !this.state.checked
    });
  }

  logChange(val) {
    const atm = [];
    val.map(function(v, index) {
      atm.push(v.value);
    });
    this.setState({
      valueSelect: atm
    });
  }

  render() {
    const { categories, conditions } = this.props;

    if (!categories || !conditions) {
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

    const options = [];
    categories.map(cat => {
      if (cat.name !== '全て') {
        options.push({
          value: cat._id,
          label: cat.name
        });
      }
    });

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <h1>Create</h1>
              <hr />
              <ListErrors errors={this.props.errors} />
              <form onSubmit={this.onSubmit} encType="multipart/form-data">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    ref="name"
                    className="form-control"
                    placeholder="name"
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    rows={10}
                    type="text"
                    ref="description"
                    className="form-control"
                    placeholder="content"
                  />
                </div>
                <div className="form-group col-lg-4 col-md-4">
                  <label>Value</label>
                  <input
                    type="number"
                    className="form-control"
                    ref="value"
                    placeholder="value"
                  />
                </div>
                <div className="form-group col-lg-4 col-md-4">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    ref="quantity"
                    placeholder="quantity"
                  />
                </div>
                <div className="form-group col-lg-4 col-md-4">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    ref="price"
                    placeholder="price"
                  />
                </div>
                <div className="form-group col-lg-6 col-md-6">
                  <label>End Date</label>
                  <input
                    type="number"
                    className="form-control"
                    ref="expDateNumber"
                    placeholder="end date"
                  />
                </div>
                {/*<div className=" form-group col-lg-6 col-md-6 marginTop">*/}
                {/*<label>*/}
                {/*<input type="checkbox" id="favorite" onChange={this.handleChangeCheck}/><label*/}
                {/*htmlFor="favorite">Favorite</label>*/}
                {/*</label>*/}
                {/*</div>*/}
                {/*<div className="col-lg-12 col-md-12">*/}
                <div className="form-group col-lg-6 col-md-6">
                  <label>Category</label>
                  <Select
                    required={true}
                    multi={true}
                    name="category"
                    value={this.state.valueSelect}
                    options={options}
                    onChange={this.logChange}
                  />
                </div>
                <div className="form-group col-lg-12 col-md-12 text-left">
                  <label>File Upload</label>
                  <input
                    type="file"
                    ref="images"
                    accept="image/*"
                    required={true}
                    multiple={true}
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-lg-12 col-md-12 gallery text-center" />
                <div className="col-lg-12 col-md-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit"
                    disabled={this.props.disabled}
                  >
                    Create
                  </button>
                  <Link to="/products" className="btn btn-default btn-cancel">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductCreate.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate);
