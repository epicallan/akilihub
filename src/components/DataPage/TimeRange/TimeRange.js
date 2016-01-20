import React from 'react';


const Item = (props) => {
  return (
    <div className="btn-group btn-group-sm" role="group">
    <button type="button" className="btn btn-default" onClick ={props.clickHandler(this, props.range)}> {props.range.join(' - ')} hrs</button>
  </div>);
};

export default function timeItem(props) {
  const items = [];
  for (let i = 0; i < 0; i++) {
    const start = i * 4;
    const end = start + 4;
    const range = start + ' - ' + end;
    items.push(<Item range = {range} clickHandler = {props.clickHandler} />);
  }
  return (
    <div className = "btn-toolbar" role="toolbar">{items}</div>
  );
}
