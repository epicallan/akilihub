import React, { Component, PropTypes } from 'react';
import s from './DataPage.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import DataPageStore from '../../stores/DataPageStore';
import Link from '../Link';
import DataPageActions from '../../actions/DataPageActions';
import Worker from 'worker!../../worker';
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
  onTimeClick = () => {

  }
  getNewData(unixTime) {
    const workerData = [];
    let counter = 0;
    const hour = 60000 * 60;
    const onMessage = (worker) => {
      worker.onmessage = (event) => {
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
      worker.postMessage(unixTime + 4 * i * hour);
      onMessage(worker);
    }
  }

  createDcCharts = (container, data) => {
    this.charts = new Charts(data);
    // this.charts.drawLineChart('sentiment');
    // leaflet map
    this.dcMap = this.charts.drawMap(container.map);
    this.dcMap.on('postRender', () => {
      document.getElementById('main').setAttribute('style', 'opacity: 1');
      document.getElementById('loader').remove();
    });
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
        <div className= "row">
          <div id = "loader" className = {cx(s.loader, 'col-sm-6', 'col-sm-offset-3')}>
            <p className= "text-center">
              <span className={cx(s.ouro, s.ouo2)}>
                <span className={s.left}><span className={s.anim}></span></span>
                <span className={s.right}><span className={s.anim}></span></span>
              </span>
            </p>
          </div>
        </div>
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
                <div className="row spacing-sm">
                  <div className="col-md-6">
                    <h4>Total volume of tweets For particular dates</h4>
                    <div id ="range"></div>
                    <i className ="small">
                       * click on a bar to fetch in data for that date
                     </i>
                  </div>
                  <div className="col-md-6">
                    <h4>Aggregate Volume of Mentions For Each Candidate </h4>
                    <div id ="row"></div>
                  </div>
                </div>
                <div className="row spacing-sm">
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
                <div className= "row spacing-sm">
                  <div className = "col-md-8" ref="mapCont" id="mapCont">
                    <h4 className = "text-center"> Geolocating possible source of tweets</h4>
                    <div id ="map" className = {s.chart} ref="map" style={divStyle} > </div>
                  </div>
                  <div className = "col-md-4">
                      <h4> Most Active Twitter users </h4>
                      <div id= "pie"></div>
                  </div>
                </div>
                <div className="row spacing-sm">
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
