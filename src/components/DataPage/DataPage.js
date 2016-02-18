import React, { Component, PropTypes } from 'react';
import s from './DataPage.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import DataPageStore from '../../stores/DataPageStore';
import Link from '../Link';
import DataPageActions from '../../actions/DataPageActions';
import Worker from 'worker!../../worker';
import Loader from '../Loader';
import TimeRange from './TimeRange';
const isBrowser = typeof window !== 'undefined';
import moment from 'moment';
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
    this.isInitialData = true;
    this.timeInterval = 4;
    this.nodeNameCounter = 0;
    this.currentDate = null;
    this.momentDate = null;
    this.getNewData = this.getNewData;
    this.isAlldata = false;
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    DataPageStore.addChangeListener(this._onChange);
    this.initalDataFetch();
    this.dataIntervalUpdates();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.charts && nextState.newData.length) {
      this.charts.updateData(nextState.newData, nextState.isInitialNewDataUpdate);
      this.charts.reRender();
    } else {
      this.createDcCharts(nextState);
    }
    return true;
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
    DataPageStore.removeChangeListener(this._onChange);
    this.charts.dcMap.map().remove();
  }

  onInitialDataReceived = (worker) => {
    worker.onmessage = (event) => {
      console.log(event);
      /* eslint-disable no-unused-expressions*/
      if (!this.state.aggregate) {
        DataPageActions.getData(event.data);
        // console.log('initialized');
      } else {
        DataPageActions.update(event.data.data, false);
        // console.log('updating');
      }
    };
  }
  onNewUpdateDate = (worker) => {
    worker.onmessage = (event) => {
      // console.log(event);
      if (event.data.length) {
        DataPageActions.update(event.data, this.isFirstNewDataPayload);
        if (this.isFirstNewDataPayload) this.isFirstNewDataPayload = false;
      } else {
        $('#loader').hide();
        // alert('we may not be having some or all the date for this time range or date');
      }
    };
  }

  onTimeClick = (range) => {
    const end = range.split('-')[1];
    const now = new Date(this.currentDate);
    this.isFirstNewDataPayload = true;
    now.setHours(parseInt(end, 10));
    now.setMinutes(0);
    $('.active').removeClass('active');
    // this.rangeOfHoursToFetch(now);
    this.getNewData(now.getTime());
  }

  getNewData = (unixStartTime) => {
    // highling currenly selected time node
    const numberOfWorkers = this.timeInterval;
    const api = `http://${window.location.host}/api/social/twdata/?`;
    $('#loader').show();
    this.fetchDataUsingWorkers(unixStartTime, {
      timeInterval: this.timeInterval,
      numberOfWorkers,
      api,
      callback: this.onNewUpdateDate });
  }

  getNewDateData = (unixDate) => {
    const now = new Date(unixDate);
    // this.timeInterval = 2;
    // setting upper limit hour to 22hr
    now.setHours(12);
    this.currentDate = now;
    this.isFirstNewDataPayload = true;
    this.rangeOfHoursToFetch(now);
    // const unixStartTime = now.getTime() - (this.timeInterval * this.hour);
    this.getNewData(now.getTime());
  }

  dataIntervalUpdates() {
    this.dataUpdateTimeInteval = setInterval(() => {
      const endDate = new Date();
      const endTime = endDate.getTime();
      const startTime = this.currentDate.getTime();
      // only update if we are viewing todays data
      if (this.currentDate.getDate() !== endDate.getDate()) return;
      this.isFirstNewDataPayload = false;
      const api = `http://${window.location.host}/api/social/twdata/?`;
      const url = `${api}start=${startTime}&end=${endTime}`;
      const worker = new Worker;
      worker.postMessage(url);
      this.onNewUpdateDate(worker);
      console.log('preiodic update');
      this.currentDate = endDate;
    }, 60000 * 3);
  }

  fetchDataUsingWorkers = (start, options) => {
    const hourParts = options.timeInterval / options.numberOfWorkers;
    // console.log(`hour parts ${hourParts}`);
    for (let i = 0; i < options.numberOfWorkers; i++) {
      const startTime = start + hourParts * i * this.hour;
      const endTime = start + hourParts * (i + 1) * this.hour;
      const worker = new Worker;
      const url = `${options.api}start=${startTime}&end=${endTime}`;
      console.log(url);
      worker.postMessage(url);
      options.callback(worker);
    }
  }

  initalDataFetch = () => {
    // let n = numberOfWorkers;
    const now = new Date();
    if (now.getHours() < 3) {
      // TODO not working as intended
      now.setHours(new Date().getHours() - 3);
    }
    // TODO hack
    // now.setHours(new Date().getHours() - 8);
    // higlight time
    this.rangeOfHoursToFetch(now);
    // if (upperEndHour) now.setHours(upperEndHour);
    console.log(`now : ${now}`);
    this.currentDate = now;
    const unixStartTime = now.getTime() - (this.timeInterval * this.hour);
    const api = `http://${window.location.host}/api/social/twdata/all/?`;
    this.fetchDataUsingWorkers(unixStartTime, {
      timeInterval: this.timeInterval,
      numberOfWorkers: this.timeInterval,
      api,
      callback: this.onInitialDataReceived });
  }

  initialTimeNode(endHour) {
    const startHour = endHour < this.timeInterval ? endHour + this.timeInterval : endHour - this.timeInterval;
    const nodeName = `${startHour}-${endHour}`;
    const node = document.getElementById(nodeName);
    return node;
  }

  rangeOfHoursToFetch = (now) => {
    let endHour = new Date(now).getHours();
    let node = this.initialTimeNode(endHour);
    while (!node) {
      endHour -= 1;
      this.nodeNameCounter ++;
      // arbitrary set our node time to avoid a stack overflow issue
      node = this.initialTimeNode(endHour);
      if (this.nodeNameCounter > this.timeInterval) {
        endHour = null;
        break;
      }
    }
    this.nodeNameCounter = 0;
    if (endHour && node) node.className += ' active';
    return endHour;
  }

  createDcCharts = (store) => {
    const chartData = store.data.length ? store.data : store.newData;
    if (!chartData.length) return;
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
      getNewData: this.getNewDateData,
      postRedraw: () => { $('#loader').hide(); },
      postRender: () => {
        $('.' + s.chart).css('opacity', 1);
        $('#loader').hide();
      },
    };
    this.charts = new Charts(chartData, store.aggregate, chartOptions);
    this.charts.init();
  }

  _onChange = () => {
    this.setState(getStateFromStores());
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
  currentMomentDate() {
    let date = null;
    if (this.currentDate) {
      const momentDate = moment(new Date(this.currentDate));
      date = momentDate.format('ddd MMM Do');
    }
    return date;
  }
  renderCharts() {
    // TODO fall back incase the first batch of received ata is empty
    if (this.state.aggregate && !this.charts) {
      try {
        this.createDcCharts(this.state);
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
                <div className={cx('row', s.timeRangeWidget, 'spacing-xsm', s.chart)}>
                   <div className="col-md-6 col-md-offset-3">
                     <h4>Select a time range for whose data you would like to fetch </h4>
                     <p>Viewing Data for : {this.currentMomentDate()}</p>
                     <TimeRange clickHandler = {this.onTimeClick} timeInterval = {this.timeInterval} />
                   </div>
                 </div>
               <div className={cx('row', 'spacing-xsm', s.chart)}>
                  <div className="col-md-6">
                    <h4>Total volume of tweets For particular dates</h4>
                    <div id ="range"></div>
                    <div className ={s.description}>
                      <small> This chart reperesents total number of mined tweets for particular dates </small>
                      <small>click on a bar to fetch data for that date </small>
                    </div>
                  </div>
                 <div className= "col-md-6" >
                    <h4>Identifying twitter data sentiments</h4>
                    <div id ="emotions"></div>
                    <div className ={s.description}>
                      <small> words that are used in conveying emotions are extracted from each tweet and the most
                        common top 5 words are plotted with their frequency
                      </small>
                    </div>
                  </div>
                </div>
                <div className= "row">
                  <div id = "loader" className = {cx(s.loader, 'col-sm-6', 'col-sm-offset-3')}>
                    <Loader />
                  </div>
                </div>
                <div className={cx('row', 'spacing-xsm', s.chart)}>
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
                <div className={cx('row', 'spacing-xsm', s.chart)}>
                  <div className = "col-md-8" ref="mapCont" id="mapCont">
                    <h4> Geolocating possible source of tweets</h4>
                    <div id ="map" className = {s.chart} ref="map" style={divStyle} > </div>
                  </div>
                  <div className = "col-md-4">
                      <h4> Most Active Twitter users </h4>
                      <div id= "pie"></div>
                  </div>
                </div>
               <div className={cx('row', 'spacing-xsm', s.chart)}>
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
