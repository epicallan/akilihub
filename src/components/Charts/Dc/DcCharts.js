import dc from 'dc';
import crossfilter from 'crossfilter2';

import d3 from 'd3';

export default class DcCharts {

  constructor(data) {
    if (data[0].date) {
      data.forEach(d => {
        d.date = new Date(d.date);
        d.hour = new Date(d.date).getHours();
      });
    }
    this.data = crossfilter(data);
  }

  drawAll() {
    dc.renderAll();
  }

  createGroup(dim, attribute) {
    return dim.group().reduceSum(d => d[attribute]);
  }

  createDimenion(attr) {
    return this.data.dimension(d => d[attr]);
  }

  lineChart(dimension, group, chartId) {
    const chart = dc.lineChart('#' + chartId);
    return chart
      .width(500)
      .height(300)
      .x(d3.scale.linear().domain([10, 16]))
      .elasticY(true)
      .brushOn(false)
      .renderDataPoints(true)
      .yAxisLabel('Y axis')
      .dimension(dimension)
      .group(group);
  }

  getDimenison(attribute) {
    return this.data.dimension(d => d[attribute]);
  }

}
