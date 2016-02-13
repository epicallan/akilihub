import React, { Component, PropTypes } from 'react';
import s from './DataPage.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import DataPageStore from '../../stores/DataPageStore';
import Link from '../Link';
import DataPageActions from '../../actions/DataPageActions';
import Worker from 'worker!../../worker';
import Loader from '../Loader';
// import TimeRange from './TimeRange';
const isBrowser = typeof window !== 'undefined';
const Charts = isBrowser ? require('../Charts') : undefined;
// import $ from 'jquery';
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
    this.hour = 60000 * 60;
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
    this.initalDataFetch(6);
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.renderCharts();
    if (this.charts && nextState.newData.length) {
      this.charts.updateData(nextState.newData, nextState.isInitialUpdate);
      this.charts.reRender();
    }
    return false;
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
    DataPageStore.removeChangeListener(this._onChange);
    this.charts.dcMap.map().remove();
  }

  onTimeClick(range) {
    // TODO
    console.log(range);
  }

  onInitialDataReceived(worker, index) {
    worker.onmessage = (event) => {
      console.log(event);
      if (index > 0) {
        if (this.state.data.length) {
          // only make data available for upadate if we have an initial payload
          DataPageActions.update(event.data.data, false);
        } else {
          // use this new update data as initial data
          DataPageActions.getData(event.data);
        }
      } else {
        DataPageActions.getData(event.data);
      }
    };
  }
  onNewDataMessage = (worker) => {
    worker.onmessage = (event) => {
      if (event.data.length) {
        DataPageActions.update(event.data, this.isFirstPayload);
        if (this.isFirstPayload) this.isFirstPayload = false;
      }
    };
  };

  getNewData = (unixTime) => {
    const workerData = [];
    const numberOfWorkers = 5;
    this.isFirstPayload = true;
    const timeIntervals = 24 / numberOfWorkers;
    $('#loader').show();
    for (let i = 0; i < numberOfWorkers; i++) {
      const worker = new Worker;
      const startTime = unixTime + timeIntervals * i * this.hour;
      const endTime = unixTime + timeIntervals * (i + 1) * this.hour;
      const url = `http://${window.location.host}/api/social/twdata/?start=${startTime}&end=${endTime}`;
      worker.postMessage(url);
      this.onNewDataMessage(worker, workerData);
    }
  }

  initalDataFetch(numberOfWorkers) {
    // let n = numberOfWorkers;
    const now = new Date();
    if (now.getHours() < 3) {
      // TODO not working as intended
      now.setHours(new Date().getHours() - 3);
    }
    now.setHours(new Date().getHours() - 630);
    console.log(`now : ${now}`);
    const hoursPast = now.getHours() + (now.getMinutes() / 60);
    console.log(`hours past ${hoursPast}`);
    const start = now.getTime() - (hoursPast * this.hour);
    const hourParts = hoursPast / numberOfWorkers;
    // .log(`number of workers to use: ${n}`);
    for (let i = 0; i < numberOfWorkers; i++) {
      const startTime = start + hourParts * i * this.hour;
      const endTime = start + hourParts * (i + 1) * this.hour;
      const worker = new Worker;
      const url = `http://${window.location.host}/api/social/twdata/all/?start=${startTime}&end=${endTime}`;
      worker.postMessage(url);
      this.onInitialDataReceived(worker, i);
    }
  }
  createDcCharts = (data) => {
    // chart container ids and callbacks
    const chartOptions = {
      row: [
        { id: 'hashtags', field: 'hashtags' },
        { id: 'terms', field: 'terms' },
        { id: 'emotions', field: 'emotions' },
      ],
      pie: 'pie',
      map: 'map',
      table: 'table',
      composite: 'composite',
      range: 'range',
      getNewData: this.getNewData,
      postRedraw: () => { $('#loader').hide(); },
      postRender: () => {
        $('.' + s.chart).css('opacity', 1);
        $('#loader').hide();
      },
    };
    this.charts = new Charts(data, this.state.aggregate, chartOptions);
    this.charts.init();
  }

  _onChange = () => {
    this.setState(getStateFromStores());
  }

  onTimeClick(range) {
    console.log(range);
  }

  computeMapDivWidth() {
    let width = 500;
    let height = 400;
    if (window.innerWidth < 500) {
      width = window.innerWidth - window.innerWidth * 0.2;
      height = width * 0.9;
    }
    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  }

  renderCharts() {
    // TODO fall back incase the first batch of received ata is empty
    if (this.state.data.length && !this.charts) {
      try {
        // console.log('initial render');
        this.createDcCharts(this.state.data);
      } catch (e) {
        // TODO hack just reload the page this is an error to do with leaflet.js
        if (!e) window.location.assign(this.path);
        /* eslint-disable no-console */
        console.log(e);
      }
    }
  }
  render = () => {
    const divStyle = isBrowser ? this.computeMapDivWidth() : null;
    return (
      <div className={cx(s.root, 'container-fluid')}>
        <h1 className="page-title"> AKILIHUB Data Innovation Center</h1>
        <hr></hr>
        <header className = "row">
            <ul id = "sub-menu-override" className={cx('nav', 'navbar-nav', 'navbar-center', 'sub-menu', s.nav)}>
              <li>
                  <Link className={s.link} to="/data">Uganda Decides</Link>
              </li>
            </ul>
        </header>
        <hr></hr>
        <section id = "main" className= {cx(s.container)}>
          <div className= {cx('col-md-12', s.main)}>
            <div className ="row spacing">
              <article className={cx('articles')}>
                <header>
                  <h3>Digging into Uganda's social Media Camapaigns related Data</h3>
                </header>
                <div className="text-justify" dangerouslySetInnerHTML={{ __html: this.props.content || '' }}></div>
                <hr></hr>
              </article>
              <section className ={cx(s.charts, 'charts-dashboard')}>
               <div className={cx('row', 'spacing-sm', s.chart)}>
                  <div className="col-md-6">
                    <h4>Total volume of tweets For particular dates</h4>
                    <div id ="range"></div>
                    <div className ={s.timeRange}>
                      <small> <i>click on a bar to fetch in data for that date </i> </small>
                    </div>
                  </div>
                 <div className= "col-md-6" >
                    <h4> Identifying the mostSentimental Words with in the Tweets </h4>
                    <div id ="emotions"></div>
                  </div>
                </div>
                <div className= "row">
                  <div id = "loader" className = {cx(s.loader, 'col-sm-6', 'col-sm-offset-3')}>
                    <Loader />
                  </div>
                </div>
                <div className={cx('row', 'spacing-sm', s.chart)}>
                  <div className="col-md-4">
                      <h4 >Twitter Mentions Per Hour</h4>
                      <div id ="composite" className ="row"></div>
                      <div className = {cx(s.legend, 'row')}>
                        <div className = {s.yellow}><small>museveni<i></i></small></div>
                        <div className = {s.blue}><small>Besigye <i></i></small></div>
                        <div className = {s.orange}><small>Mbabazi<i></i> </small></div>
                      </div>
                  </div>
                  <div className="col-md-4">
                    <h4>Twitter Trending Hashtags</h4>
                    <div id ="hashtags"></div>
                  </div>
                  <div className="col-md-4">
                    <h4 >Twitter Most Frequent Terms</h4>
                    <div id ="terms"></div>
                  </div>
                </div>
                <div className={cx('row', 'spacing-sm', s.chart)}>
                  <div className = "col-md-8" ref="mapCont" id="mapCont">
                    <h4> Geolocating possible source of tweets</h4>
                    <div id ="map" className = {s.chart} ref="map" style={divStyle} > </div>
                  </div>
                  <div className = "col-md-4">
                      <h4> Most Active Twitter users </h4>
                      <div id= "pie"></div>
                  </div>
                </div>
               <div className={cx('row', 'spacing-sm', s.chart)}>
                  <div className = "col-md-11 table-cont">
                    <h3> Twitter data tables</h3>
                      <table id ="table" className = {cx('table', 'table-hover', 'table-bordered', 'rt', 'cf')}>
                        <thead>
                          <tr className={s.header}>
                            <th>Tweet</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Location</th>
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
