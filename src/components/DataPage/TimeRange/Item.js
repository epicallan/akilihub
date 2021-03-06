import React, { Component, PropTypes } from 'react';

export default class Item extends Component {

  static propTypes = {
    range: PropTypes.string,
    clickHandler: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.range = props.range;
    this.nodeName = props.range.replace(/\s/g, '');
    this.clickHandler = props.clickHandler;
  }

  render = () => {
    return (
      <div className="btn-group btn-group-sm" role="group">
        <button type="button" className="btn btn-default" id = {this.nodeName} onClick = {this.clickHandler.bind(this, this.range)} >
          {this.range}
          hrs</button>
      </div>
    );
  }
}
