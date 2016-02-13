import React from 'react';

function draw(props) {
  const chart = props.dc.rowChart('#' + props.id)
    .height(300)
    .width(330)
    .margins({
      top: 10,
      right: 10,
      bottom: 20,
      left: 40,
    })
    .dimension(props.dimension)
    .group(props.group)
    .ordering(p => -p.value)
    .elasticX(true);
  chart.render();
}

export default function row(props) {
  return props.row ? <div id = { props.id } > { draw(props) } < /div> : <div></div>;
}

row.propTypes = {
  id: React.PropTypes.string,
  dc: React.PropTypes.func,
  dimension: React.PropTypes.object,
  group: React.PropTypes.object,
};
