import dc from './dc';
import cf from '../../core/CfHelper';
import 'datatables';
import $ from 'jquery';
import moment from 'moment';
// import './dtplugin';

export default class DcCharts {

  constructor(data) {
    this.lastDate = null;
    this.charts = null;
    const transformedData = this._dataTransform(data);
    this.data = cf.createCrossFilter(transformedData);
  }

  _dataTransform(data) {
    if (data[0].date) {
      this.lastDate = data[data.length - 1].date;
      data.forEach(d => {
        const momentDate = moment(d.date);
        // const sentiment = d.sentiment.toFixed(1) || d.sentiment;
        d.date = momentDate.format('ddd MMM Do, HH:mm');
        d.text = d.text.toLowerCase();
        d.timeStamp = momentDate.valueOf();
        // d.sentiment = sentiment || 0;
        d.hour = momentDate.hour();
      });
    }
    return data;
  }

  updateData(raw) {
    const newData = this._dataTransform(raw);
    this.data.remove();
    this.data.add(newData);
    console.log('updated data');
  }

  createDataTable(table) {
    this.tableDimension = this.createDimenion('text');
    this.datatable = $('#' + table);
    // initialize datatable
    // $.fn.dataTable.moment('ddd MMM Do, hA');
    this.datatable.dataTable(this._dataTablesOptions());
    // call RefreshTable when dc-charts are filtered
    for (let i = 0; i < dc.chartRegistry.list().length; i++) {
      const chartI = dc.chartRegistry.list()[i];
      chartI.on('filtered', this._tablesRefresh);
    }
    // styling
    $('input,select,.table-cont a').addClass('btn btn-default');
    // initial table refresh/draw
    this._tablesRefresh();
    // table filter
    this._Tablefilter();
  }

  _tablesRefresh = () => {
    dc.events.trigger(() => {
      const alldata = this.tableDimension.top(Infinity);
      this.datatable.fnClearTable();
      this.datatable.fnAddData(alldata);
      this.datatable.fnDraw();
    });
  }

  _Tablefilter = () => {
    // filter all charts when using the datatables search box
    // TODO use react state lifecycle
    const self = this;
    $(':input').on('keyup', function () {
      if (this.value !== '') {
        self.tableDimension.filter((d) => {
          return d.indexOf(this.value.toLowerCase()) !== -1;
        });
        self._tablesRefresh();
        dc.redrawAll();
      } else {
        self.tableDimension.filterAll();
      }
    });
  }
  redrawAll() {
    dc.redrawAll();
  }
  _dataTablesOptions() {
    return {
      'pageLength': 5,
      'order': [[1, 'desc']],
      'bSort': true,
      columnDefs: [{
        targets: 0,
        data: d => d.text,
        defaultContent: '',
      }, {
        targets: 1,
        data: d => `<span>${d.timeStamp}</span>${d.date}`,
      }, {
        targets: 2,
        data: d => d.location,
        defaultContent: '',
      }, {
        targets: 3,
        data: d => d.sentiment,
        defaultContent: '',
      }],
    };
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
  drawMap(container) {
    if (this.mapDim) this.mapDim.dispose();
    this.mapDim = this.createDimenion('coordinates');
    const mapGroup = this.mapDim.group().reduceCount();
    return this.mapChart(this.mapDim, mapGroup, container);
  }

  drawRawChart(id) {
    const { dim, group } = this.createGroupAndDimArrayField('user_mentions');
    this.row = this.rowChart(dim, group, id);
  }
  rowChart(dim, group, rowId) {
    return dc.rowChart('#' + rowId)
      .height(300)
      .width(330)
      .margins({
        top: 10,
        right: 10,
        bottom: 20,
        left: 40,
      })
      .dimension(dim)
      .group(group)
      .ordering(p => -p.value)
      .elasticX(true);
  }
  mapChart(dim, grp, mapId) {
    const mapGroup = cf.fakeGroup(grp, 'key');
    // console.log('map count: '+ mapGroup.all().length);
    return dc.leafletMarkerChart('#' + mapId)
      .dimension(dim)
      .group(mapGroup)
      .width(600)
      .height(400)
      .zoom(12)
      .fitOnRender(true)
      .fitOnRedraw(true)
      .cluster(true);
  }

  drawPieChart(id) {
    const dim = this.createDimenion('screen_name');
    // const { dim, group } = this.createGroupAndDimArrayField('user_mentions');
    const group = dim.group();
    // top group patch
    // cf.topGroupPatch(group)
    this.pieChart(dim, group, id);
  }
  pieChart(dim, grp, pie) {
    return dc.pieChart('#' + pie)
      .dimension(dim)
      .group(cf.reduceGroupObjs(grp))
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
    const range = cf.getMinAndMax(group, 'key');
    return dc.lineChart('#' + chartId)
      .width(450)
      .height(300)
      .x(dc.d3.scale.linear().domain(range))
      .elasticY(true)
      .elasticX(true)
      .brushOn(true)
      .renderDataPoints(true)
      .yAxisLabel('Y axis')
      .dimension(dimension)
      .group(group);
  }
}
