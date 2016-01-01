import crossfilter from 'crossfilter2';
import d3 from 'd3';
import dc from 'dc-addons';

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

  mapChart(dim, grp, mapId) {
    return dc.leafletMarkerChart('#' + mapId)
      .dimension(dim)
      .group(grp)
      .width(600)
      .height(400)
      .fitOnRender(true)
      .fitOnRedraw(true)
      .cluster(true);
  }
  pieChart(dim, group, pie) {
    return dc.pieChart('#' + pie)
      .dimension(dim)
      .group(group)
      .width(200)
      .height(200)
      .renderLabel(true)
      .renderTitle(true)
      .ordering(p => -p.value);
  }

  tableChart(dim, table) {
    return dc.dataTable('#' + table)
      .width(768)
      .height(480)
      .dimension(dim)
      .group(() => 'dc.js insists on putting a row here so I remove it using JS')
      .columns([
        d => d.hour,
        d => d.type,
        d => d.sentiment,
      ])
      .order(d3.descending)
      .on('renderlet', (chart) => {
        // each time table is rendered remove nasty extra row dc.js insists on adding
        chart.select('tr.dc-table-group').remove();
      });
  }

  lineChart(dimension, group, chartId) {
    // TODO modularize
    const chart = dc.lineChart('#' + chartId);
    return chart
      .width(500)
      .height(300)
      .x(d3.scale.linear().domain(d3.extent(dimension.top(Infinity)), d => d.hour))
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
