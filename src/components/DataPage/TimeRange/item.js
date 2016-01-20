import React from 'react';

export default function timeItem(props) {
  return (
    <div className="btn-group btn-group-sm" role="group">
      <button type="button" className="btn btn-default" onClick ={props.clickHandler(this, props.range)}> {props.range.join(' - ')} hrs</button>
    </div>
  );
}
