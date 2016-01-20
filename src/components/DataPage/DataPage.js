import React, { Component, PropTypes } from 'react';
import s from './DataPage.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import DataPageStore from '../../stores/DataPageStore';
import Link from '../Link';
import DataPageActions from '../../actions/DataPageActions';
import Worker from 'worker!../../worker';
// import Worker from 'worker?name=fetch!../../core';

const isBrowser = typeof window !== 'undefined';
const Charts = isBrowser ? require('../Charts') : undefined;

// import testData from './data';

function getStateFromStores() {
  return DataPageStore.getStoreState();
}

const title = 'Data Center';

@withStyles(s)
export default class DataCenterPage extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    path: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this.path = props.path;
    this.lastDate = null;
    this.getNewData = this.getNewData;
    this.isAlldata = false;
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    DataPageStore.addChangeListener(this._onChange);
    if (isBrowser) {
      try {
        this.createDcCharts({ map: 'map', line: 'line', table: 'table', pie: 'pie', row: 'row' }, this.state.data);
      } catch (e) {
        // TODO hack just reload the page this is an error to do with leaflet.js
        if (!e) window.location.assign(this.path);
        /* eslint-disable no-console */
        console.log(e);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextState);
    this.charts.updateData(nextState.newData);
    this.charts.reRender();
    // this.reRenderMap();
    return false;
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
    DataPageStore.removeChangeListener(this._onChange);
    this.dcMap.map().remove();
  }

  getNewData(unixTime) {
    const workerData = [];
    let counter = 0;
    const hour = 60000 * 60;
    const onMessage = (worker) => {
      worker.onmessage = (event) => {
        workerData.push(...event.data);
        counter ++;
        console.log(counter);
        // if (!counter) console.log(workerData);
        if (counter === 4) {
          console.log(workerData.length);
          DataPageActions.update(workerData);
          console.log('Message received from worker');
        }
      };
    };
    for (let i = 0; i < 4; i++) {
      const worker = new Worker;
      worker.postMessage(unixTime + 6 * i * hour);
      onMessage(worker);
    }
  }

  createDcCharts(container, data) {
    this.charts = new Charts(data);
    // this.charts.drawLineChart('sentiment');
    // leaflet map
    this.charts.drawMap(container.map);
    // row
    this.charts.drawRawChart(container.row);
    // pie
    this.charts.drawPieChart(container.pie);
    // table
    // this.table = this.charts.tableChart(dim, container.table);
    this.charts.createDataTable(container.table);
    // multiLineChart
    this.charts.drawComposite('composite');
    this.charts.drawHashTags('hashtags');
    this.charts.drawTerms('terms');
    // this.table.render();
    this.charts.drawAll();
    // this.charts.drawRangeChart('range', this.state.aggregate, this.getNewData);
    this.charts.rangeChart('range', this.state.aggregate, this.getNewData);
  }

  _onChange = () => {
    this.setState(getStateFromStores());
  }

  render() {
    const divStyle = {
      width: '500px',
      height: '400px',
    };
    return (
      <div className={cx(s.root, 'container-fluid')}>
        <h2 className={s.logo}> AKILIHUB Data Innovation Center</h2>
        <hr></hr>
        <header className = "row">
            <ul className={cx('nav', 'navbar-nav', 'navbar-center', s.nav)}>
              <li>
                  <Link className={s.link} to="/blog">Data Decides</Link>
              </li>
              <li>
                  <Link className={s.link} to="/"> Data Explorations</Link>
              </li>
              <li>
                  <Link className={s.link} to="/Data">Experimental</Link>
              </li>
            </ul>
        </header>
        <hr></hr>
        <section className= {cx('container', s.container)}>
          <div className= {cx('col-md-12', s.main)}>
            <div className ="row spacing">
              <article className="col-md-12">
                <header>
                  <h3>Digging into the campaigns social Media Stats</h3>
                </header>
                <div className="text-justify" dangerouslySetInnerHTML={{ __html: this.props.content || '' }}></div>
                <hr></hr>
              </article>
              <section className ={s.charts}>
                <div className="row spacing-sm">
                  <div className="col-md-6">
                      <div id ="range"></div>
                  </div>
                  <div className="col-md-6">
                    <div id ="row"></div>
                  </div>
                </div>
                <div className="row spacing-sm">
                  <div className="col-md-4">
                      <div id ="composite"></div>
                  </div>
                  <div className="col-md-4">
                    <div id ="hashtags"></div>
                  </div>
                  <div className="col-md-4">
                    <div id ="terms"></div>
                  </div>
                </div>
                <div className= "row spacing-sm">
                  <div className = "col-md-8" ref="mapCont" id="mapCont">
                    <h3> Map Chart</h3>
                    <div id ="map" className = {s.chart} ref="map" style={divStyle} > </div>
                  </div>
                  <div className = "col-md-4">
                      <h3> Pie Chart</h3>
                      <div id= "pie"></div>
                  </div>
                </div>
                <div className="row spacing-sm">
                  <div className = "col-md-11 table-cont">
                    <h3> Table Chart</h3>
                    <table id ="table" className = {cx('table', 'table-hover', 'table-bordered')}>
                      <thead>
                        <tr className={s.header}>
                          <th>Tweet</th>
                          <th>Date</th>
                          <th>Location</th>
                          <th>sentiment</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>

              </section>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
