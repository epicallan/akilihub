import React, { Component, PropTypes } from 'react';
import Item from './Item';

export default class TimeRange extends Component {

  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.clickHandler = this.props.clickHandler;
  }

  render() {
    const items = [];
    for (let i = 0; i < 6; i++) {
      const start = i * 4;
      const end = start + 4;
      const range = start + ' - ' + end;
      items.push(< Item key = {end} range = {range} clickHandler = {this.clickHandler} />);
    }
    return (
      <div className="btn-toolbar" role="toolbar">{items}</div>
    );
  }
}
