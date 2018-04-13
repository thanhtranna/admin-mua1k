import React, { Component } from 'react';

class ListErrors extends Component {
  render() {
    const errors = this.props.errors;
    const style = { 'list-style-type': 'none' };
    if (errors) {
      return (
        <ul className="alert alert-danger fade in" style={style}>
          <li>{errors.message}</li>
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;
