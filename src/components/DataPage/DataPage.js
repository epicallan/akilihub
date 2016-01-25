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
    if (isBrowser) {
      try {
        this.createDcCharts(this.state.data);
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
  onTimeClick(range) {
    console.log(range);
  }

  getNewData(unixTime) {
    const workerData = [];
    let counter = 0;
    const hour = 60000 * 60;
    $('#loader').show();
    const onMessage = (worker) => {
      worker.onmessage = (event) => {
        if (!event.data.length) return;
        console.log(event.data[0].date);
        console.log(event.data[event.data.length - 1].date);
        workerData.push(...event.data);
        counter ++;
        console.log(counter);
        if (counter === 6) {
          console.log(workerData.length);
          DataPageActions.update(workerData);
          console.log('Message received from worker');
        }
      };
    };
    for (let i = 0; i < 6; i++) {
      const worker = new Worker;
      const time = unixTime + 4 * i * hour;
      const url = `http://${window.location.host}/api/social/twdata/${time}`;
      worker.postMessage(url);
      onMessage(worker);
    }
  }

  createDcCharts = (data) => {
    const rowChartsArgs = [
      { id: 'hashtags', field: 'hashtags' },
      { id: 'terms', field: 'terms' },
      { id: 'user_mentions', field: 'user_mentions' },
    ];
    this.charts = new Charts(data, rowChartsArgs);
    // leaflet map
    this.dcMap = this.charts.drawMap('map');
    this.dcMap.on('postRender', () => {
      $('.' + s.chart).css('opacity', 1);
      $('#loader').hide();
    });
    this.dcMap.on('postRedraw', () => { $('#loader').hide(); });
    this.charts.drawPieChart('pie');
    this.charts.createDataTable('table');
    // row Charts
    this.charts.drawRowCharts(false);
    this.charts.drawComposite('composite');
    this.charts.drawAll();
    // this.charts.drawRangeChart('range', this.state.aggregate, this.getNewData);
    this.charts.rangeChart('range', this.state.aggregate, this.getNewData);
  }

  _onChange = () => {
    this.setState(getStateFromStores());
  }

  onTimeClick(range) {
    console.log(range);
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
                    <h4 className = "text-center"> Geolocating possible source of tweets</h4>
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
