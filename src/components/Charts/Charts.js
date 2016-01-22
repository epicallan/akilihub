import dc from './dc';
import cf from '../../core/CfHelper';
import 'datatables';
import $ from 'jquery';
import moment from 'moment';
import c3 from 'c3';


// import './dtplugin';

export default class DcCharts {

  constructor(data) {
    this.lastDate = null;
    this.charts = null;
    this.mentions = ['museveni', 'besigye', 'mbabazi', 'baryamureeba', 'bwanika'];
    const transformedData = this._dataTransform(data);
    this.data = cf.createCrossFilter(transformedData);
    this.hourDim = this.createDimenion('hour');
    // console.log(data[4]);
  }

  _dataTransform(data) {
    this.lowerLimit = data[0].timeStamp;
    this.upperLimit = data[data.length - 1].timeStamp;
    data.forEach(d => {
      const momentDate = moment(new Date(d.date));
      d.hour = momentDate.hour();
      d.date = momentDate.format('ddd MMM Do, HH:mm');
    });
    return data;
  }

  updateData(raw) {
    const newData = this._dataTransform(raw);
    this.data.remove();
    this.data.add(newData);
    console.log(`updated data   ${this.data.size()}`);
  }

  createDataTable(table) {
    this.tableDimension = this.createDimenion('text');
    this.datatable = $('#' + table);
    // initialize datatable
    this.datatable.dataTable(this._dataTablesOptions());
    // call RefreshTable wshen dc-charts are filtered
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
    /* eslint-disable func-names*/
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
  reRender() {
    dc.redrawAll();
    this.row.render();
    this._tablesRefresh();
    // this.pie.render();
    this.hashtags.render();
    this.terms.render();
  }
  _dataTablesOptions() {
    return {
      'pageLength': 5,
      'order': [
        [1, 'desc'],
      ],
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
        defaultContent: 0,
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
  drawHashTags(id) {
    const { dim, group } = this.createGroupAndDimArrayField('hashtags');
    this.hashtags = this.rowChart(dim, group, id);
  }
  drawTerms(id) {
    const { dim, group } = this.createGroupAndDimArrayField('terms');
    this.terms = this.rowChart(dim, group, id);
  }
  drawRawChart(id) {
    const { dim, group } = this.createGroupAndDimArrayField('user_mentions');
    // console.log(dim.top(2));
    console.log(group.all());
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
  drawMap(container) {
    if (this.mapDim) this.mapDim.dispose();
    this.mapDim = this.createDimenion('coordinates');
    const mapGroup = this.mapDim.group().reduceCount();
    return this.mapChart(this.mapDim, mapGroup, container);
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
    const group = dim.group();
    this.pie = this.pieChart(dim, group, id);
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

  drawLineChart(id) {
    // line chart
    const lineGroup = this.createGroup(this.hourDim, 'sentiment');
    this.line = this.lineChart(this.hourDim, lineGroup, id);
  }

  multiLineCharts(dim, options) {
    options.forEach((d) => {
      dc.lineChart('#' + d.id)
        .width(350)
        .height(250)
        .x(dc.d3.scale.linear().domain([0, 24]))
        .elasticY(true)
        .elasticX(true)
        .brushOn(true)
        .renderDataPoints(true)
        .yAxisLabel('Y axis')
        .xUnits(dc.d3.time.hours)
        .dimension(dim)
        .group(d.group);
    });
  }
  drawComposite(id) {
    const museveniGroup = this.hourDim.group().reduceSum(d => d.museveni);
    const besigyeGroup = this.hourDim.group().reduceSum(d => d.besigye);
    const mbabaziGroup = this.hourDim.group().reduceSum(d => d.mbabazi);
    const groups = [museveniGroup, besigyeGroup, mbabaziGroup];
    this.compositeLineChart(this.hourDim, groups, id);
  }

  compositeLineChart(dim, groups, chartId) {
    const composite = dc.compositeChart('#' + chartId);
    // console.log([new Date(this.lowerLimit), new Date(this.upperLimit)]);
    composite.width(450)
      .height(300)
      .yAxisLabel('Tweets')
      .xAxisLabel('Hours')
      .renderHorizontalGridLines(true)
      .x(dc.d3.scale.linear().domain([0, 24]))
      .xUnits(dc.d3.time.hours)
      .elasticY(true)
      .elasticX(true)
      .brushOn(false)
      .compose([
        dc.lineChart(composite)
        .dimension(dim)
        .colors('yellow')
        .brushOn(true)
        .group(groups[0], 'museveni'),
        dc.lineChart(composite)
        .dimension(dim)
        .brushOn(true)
        .colors('blue')
        .group(groups[1], 'besigye'),
        dc.lineChart(composite)
        .dimension(dim)
        .colors('orange')
        .group(groups[2], 'amama'),
      ])
      .render();
  }
  lineChart(dimension, group, chartId) {
    return dc.lineChart('#' + chartId)
      .width(350)
      .height(250)
      .x(dc.d3.scale.linear().domain([new Date(this.lowerLimit), new Date(this.upperLimit)]))
      .elasticY(true)
      .elasticX(true)
      .brushOn(true)
      .renderDataPoints(true)
      .yAxisLabel('Y axis')
      .xUnits(dc.d3.time.hours)
      .dimension(dimension)
      .group(group);
  }

  rangeChart(chartId, data, callback) {
    const styles = {
      stroke: 'rgb(20, 119, 180)',
      fill: 'rgb(20, 119, 180)',
      opacity: 0.5,
    };
    return c3.generate({
      bindto: '#' + chartId,
      onrendered: () => {
        $(`.c3-bar-${data.length - 1}`).css(styles);
      },
      data: {
        json: data,
        keys: {
          x: 'key',
          value: ['value'],
        },
        type: 'bar',
        onclick: (d, element) => {
          $(element).css(styles);
          const startTime = moment(`2016-01-${d.x} 00:00`).valueOf();
          setTimeout(callback(startTime), 50);
        },
      },
      bar: {
        width: {
          ratio: 0.25,
        },
      },
      axis: {
        x: {
          text: 'January dates',
        },
        y: {
          label: {
            text: 'Total Tweets',
            position: 'outer-middle',
          },
        },
      },
    });
  }
}
