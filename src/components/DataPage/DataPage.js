import React, { Component, PropTypes } from 'react';
import s from './DataPage.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import DataPageStore from '../../stores/DataPageStore';
import Link from '../Link';
import fetch from '../../core/fetch';
import DataPageActions from '../../actions/DataPageActions';
const isBrowser = typeof window !== 'undefined';
const Charts = isBrowser ? require('../Charts') : undefined;

// import testData from './data';

function getStateFromStores() {
  return {
    data: DataPageStore.getStoreState(),
  };
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
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    DataPageStore.addChangeListener(this._onChange);
    if (isBrowser) {
      try {
        // console.log(this.state.data[0]);
        // this.state.data has data from the server
        this.createDcCharts({ map: 'map', line: 'line', table: 'table', pie: 'pie' }, this.state.data);
        // this.getNewData();
      } catch (e) {
        // TODO hack just reload the page this is an error to do with leaflet.js
        // window.location.assign(this.path);
        /* eslint-disable no-console */
        console.log(e);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('new data: ' + nextState.data.length);
    this.charts.updateData(nextState.data);
    this.lineChart.redraw();
    this.pieChart.redraw();
    this.table.redraw();
    const myNode = document.getElementById('map');
    const clone = myNode.cloneNode(false);
    myNode.parentNode.replaceChild(clone, myNode);
    this.dcMap = this.charts.drawMap(clone.id);
    this.dcMap.render();
    return false;
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
    DataPageStore.removeChangeListener(this._onChange);
    this.dcMap.map().remove();
  }

  getNewData() {
    setInterval(async () => {
      const response = await fetch(`/api/social/twdata/${this.lastDate}`);
      const data = await response.json();
      DataPageActions.update(data);
    }, 120000);
  }

  createDcCharts(container, data) {
    this.charts = new Charts(data);
    this.lastDate = this.charts.lastDate;
    console.log(this.lastDate);
    // line chart
    const lineDim = this.charts.createDimenion('hour');
    const lineGroup = this.charts.createGroup(lineDim, 'sentiment');
    this.lineChart = this.charts.lineChart(lineDim, lineGroup, container.line);
    // this.lineChart.render();
    // leaflet map
    this.dcMap = this.charts.drawMap(container.map);
    // pie
    const { dim, group } = this.charts.createGroupAndDimArrayField('user_mentions');
    this.pieChart = this.charts.pieChart(dim, group, container.pie);
    // this.pieChart.render();
    // table
    // this.table = this.charts.tableChart(dim, container.table);
    this.charts.createDataTable(container.table);
    // this.table.render();
    this.charts.drawAll();
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
          <div className= {cx('col-md-9', s.main)}>
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
                  <div className="col-md-12">
                      <h3> Line Chart</h3>
                      <div id ="line"></div>
                  </div>
                </div>
                <div className="row spacing-sm">
                  <div className = "col-md-12">
                    <h3> Table Chart</h3>
                    <table id ="table" className = {cx('table', 'table-hover', 'table-bordered')}>
                      <thead>
                        <tr className={s.header}>
                          <th>Tweet</th>
                          <th>Hour</th>
                          <th>Type</th>
                          <th>sentiment</th>
                        </tr>
                      </thead>
                    </table>
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
              </section>
            </div>
          </div>
          <div className= {cx('col-md-3', s.sidebar)}>
            <header className= "row">
              <h3>Top Data Journeys</h3>
              <hr></hr>
            </header>
            <section>
              <div className = "row spacing">
                <header>
                  <Link className={s.link} to="/blog">#AskMuseveni  Twitter metric </Link>
                </header>
                <hr></hr>
              </div>
              <div className = "row spacing">
                <header>
                  <Link className={s.link} to="/blog"> The Aine case Data Map</Link>
                </header>
                <hr></hr>
              </div>
              <div className = "row spacing">
                <header>
                  <Link className={s.link} to="/blog"> Who has the most Bots Data </Link>
                </header>
                <hr></hr>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}
