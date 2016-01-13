import dc from './dc';
import cf from '../../core/CfHelper';

export default class DcCharts {

  constructor(data) {
    if (data[0].date) {
      data.forEach(d => {
        const date = new Date(d.date);
        d.date = date;
        d.hour = date.getHours();
      });
    }
    this.data = cf.createCrossFilter(data);
  }

  drawAll() {
    dc.renderAll();
  }

  createGroup(dim, attr) {
    return cf.createSumGroup(dim, attr);
  }

  createDimenion(attr) {
    return cf.createDimension(this.data, attr);
  }

  createGroupAndDimArrayField(attr) {
    return cf.arrayDimAndGroup(this.data, attr);
  }

  mapChart(dim, grp, mapId) {
    // cf.purgeGroup(grp);
    return dc.leafletMarkerChart('#' + mapId)
      .dimension(dim)
      .group(cf.fakeGroup(grp))
      .width(600)
      .height(400)
      .zoom(12)
      .fitOnRender(true)
      .fitOnRedraw(true)
      .cluster(true);
  }

  pieChart(dim, grp, pie) {
    return dc.pieChart('#' + pie)
      .dimension(dim)
      .group(grp)
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
        d => d.text,
        d => d.hour,
        d => d.type,
        d => d.sentiment,
      ])
      .size(5)
      .order(dc.d3.descending)
      .on('renderlet', (chart) => {
        // each time table is rendered remove nasty extra row dc.js insists on adding
        chart.select('tr.dc-table-group').remove();
      });
  }

  lineChart(dimension, group, chartId) {
    // TODO modularize
    const chart = dc.lineChart('#' + chartId);
    return chart
      .width(450)
      .height(300)
      .x(dc.d3.scale.linear().domain(cf.getMinAndMax(group, 'key')))
      .elasticY(true)
      .brushOn(true)
      .renderDataPoints(true)
      .yAxisLabel('Y axis')
      .dimension(dimension)
      .group(group);
  }
}
