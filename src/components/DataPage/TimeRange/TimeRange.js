import React, { Component, PropTypes } from 'react';
import Item from './Item';

export default class TimeRange extends Component {

  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
    timeInterval: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.clickHandler = this.props.clickHandler;
    this.timeInterval = this.props.timeInterval;
  }

  render() {
    const items = [];
    const timeSpan = 24 / this.timeInterval;
    for (let i = 0; i < timeSpan; i++) {
      const start = i * this.timeInterval;
      const end = start + this.timeInterval;
      const range = start + ' - ' + end;
      items.push(< Item key = {end} range = {range} clickHandler = {this.clickHandler} />);
    }
    return (
      <div className="btn-toolbar" role="toolbar">{items}</div>
    );
  }
}
