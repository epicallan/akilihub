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
import $ from 'jquery';
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
    this.initalDataFetch(2);
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
      if (index > 0) {
        DataPageActions.update(event.data.data, true);
      } else {
        DataPageActions.getData(event.data);
      }
    };
  }
  onNewDataMessage = (worker, workerData) => {
    worker.onmessage = (event) => {
      this.updateDataCounter ++;
      if (event.data.length) {
        workerData.push(...event.data);
        // console.log(this.updateDataCounter);
        if (this.updateDataCounter === this.numberOfWorkers) {
          // console.log(workerData.length);
          DataPageActions.update(workerData, false);
          // console.log('All data received from worker');
        }
      }
    };
  };
  getNewData = (unixTime) => {
    const workerData = [];
    this.updateDataCounter = 0;
    const hour = 60000 * 60;
    this.numberOfWorkers = 6;
    $('#loader').show();
    for (let i = 0; i < this.numberOfWorkers; i++) {
      const worker = new Worker;
      const time = unixTime + 6 * i * hour;
      const url = `http://${window.location.host}/api/social/twdata/${time}`;
      worker.postMessage(url);
      this.onNewDataMessage(worker, workerData);
    }
  }

  initalDataFetch(fetchs) {
    const hour = 60000 * 60;
    const now = new Date();
    // now.setHours(new Date().getHours() - 190);
    // console.log(`now : ${now}`);
    const hoursPast = now.getHours();
    // console.log(`hours past ${hoursPast}`);
    const start = now.getTime() - (hoursPast * hour);
    const hourParts = hoursPast / fetchs;
    for (let i = 0; i < fetchs; i++) {
      const startTime = start + hourParts * i * hour;
      const endTime = start + hourParts * (i + 1) * hour;
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
        { id: 'user_mentions', field: 'user_mentions' },
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

  renderCharts() {
    if (this.state.data && !this.charts) {
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
                  <Link className={s.link} to="/data">Uganda Decides</Link>
              </li>
              <li>
                  <Link className={s.link} to="/data"> Data Explorations</Link>
              </li>
            </ul>
        </header>
        <hr></hr>
        <section id = "main" className= {cx('container', s.container)}>
          <div className= {cx('col-md-12', s.main)}>
            <div className ="row spacing">
              <article className="col-md-12">
                <header>
                  <h3>Digging into the Uganda campaigns social Media Stats</h3>
                </header>
                <div className="text-justify" dangerouslySetInnerHTML={{ __html: this.props.content || '' }}></div>
                <hr></hr>
              </article>
              <section className ={s.charts}>
               <div className={cx('row', 'spacing-sm', s.chart)}>
                  <div className="col-md-6">
                    <h4>Total volume of tweets For particular dates</h4>
                    <div id ="range"></div>
                    <div className ={s.timeRange}>
                      <small> <i>click on a bar to fetch in data for that date </i> </small>
                    </div>
                  </div>
                 <div className={cx('row', s.chart)}>
                    <h4>Aggregate Volume of Mentions For Each Candidate </h4>
                    <div id ="user_mentions"></div>
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
