import dc from 'dc';
import crossfilter from 'crossfilter2';
import d3 from 'd3';


export default class DcCharts {

  constructor(data) {
    const dateFormat = d3.time.format('%Y-%m-%dT%H:%M');
    if (data.date) {
      data.forEach(d => {
        d.date = dateFormat.parse(d.date);
      });
      this.cfxData = crossfilter(data);
    }
  }

  drawAll() {
    dc.renderAll();
  }

  createGroup(dim, attribute) {
    return dim.group.reduceCount(d => d[attribute]);
  }

  createDimenion(type) {
    return this.cfxData.dimension(d => d[type]);
  }

  lineChart(dimension, group, chartId) {
    const chart = dc.lineChart(chartId);
    return chart
    .width(768)
    .height(480)
    .x(d3.time.scale())
    .xUnits(d3.time.hours)
    .elasticY(true)
    .margins({ top: 10, right: 50, bottom: 30, left: 40 })
    .renderArea(true)
    .brushOn(false)
    .renderDataPoints(true)
    .clipPadding(10)
    .yAxisLabel('Y axis')
    .dimension(dimension)
    .group(group);
  }

  getDimenison(attribute) {
    return this.cfxData.dimension(d => d[attribute]);
  }

}
