import React, { Component, PropTypes } from 'react';
import s from './DataPage.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import UgandaPageStore from '../../stores/UgandaPageStore';
import TestData from './data';
import Link from '../Link';
const isBrowser = typeof window !== 'undefined';
const Charts = isBrowser ? require('../Charts') : undefined;

function getStateFromStores() {
  return {
    data: UgandaPageStore.getStoreState(),
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
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    UgandaPageStore.addChangeListener(this._onChange);
    if (isBrowser) {
      try {
        // this.state.data has data from the server
        this.createDcCharts({ map: 'map', line: 'line', table: 'table', pie: 'pie' }, TestData);
      } catch (e) {
        // TODO hack just reload the page this is an error to do with leaflet.js
        window.location.assign(this.path);
      }
    }
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
    UgandaPageStore.removeChangeListener(this._onChange);
    this.dcMap.map().remove();
  }

  createDcCharts(container, data) {
    this.charts = new Charts(data);
    // line chart
    const dim = this.charts.createDimenion('hour');
    const group = this.charts.createGroup(dim, 'sentiment');
    this.charts.lineChart(dim, group, container.line);
    // leaflet map
    const mapDim = this.charts.createDimenion('geo');
    const facilitiesGroup = mapDim.group().reduceCount();
    this.dcMap = this.charts.mapChart(mapDim, facilitiesGroup, container.map);
    // pie
    const pieDim = this.charts.createDimenion('type');
    const pieGroup = this.charts.createGroup(pieDim, 'hour');
    this.charts.pieChart(pieDim, pieGroup, container.pie);
    // table
    this.charts.tableChart(dim, container.table);
    this.charts.drawAll();
  }
  _onChange() {
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
                  <Link className={s.link} to="/blog">Uganda Decides</Link>
              </li>
              <li>
                  <Link className={s.link} to="/"> Data Explorations</Link>
              </li>
              <li>
                  <Link className={s.link} to="/uganda">Experimental</Link>
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
                  <div className="col-md-6">
                      <h3> Line Chart</h3>
                      <div id ="line" className={s.chart}></div>
                  </div>
                  <div className = "col-md-6">
                    <h3> Table Chart</h3>
                    <table id ="table" className = {cx(s.chart, 'table', 'table-bordered')}>
                      <thead>
                        <tr className={s.header}>
                          <th>Hour</th>
                          <th>Type</th>
                          <th>sentiment</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
                <div className= "row spacing-sm">
                  <div className = "col-md-8" ref="mapCont">
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
