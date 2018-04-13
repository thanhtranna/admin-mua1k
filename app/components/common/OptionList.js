import React, { Component } from 'react';

class OptionList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { _id, name } = this.props;
    return <option value={_id}>{name}</option>;
  }
}

export default OptionList;
