/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import s from './UgandaPage.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import UgandaPageStore from '../../stores/UgandaPageStore';
import TestData from './data';
const isBrowser = typeof window !== 'undefined';
const Charts = isBrowser ? require('../Charts') : undefined;

function getStateFromStores() {
  return {
    data: UgandaPageStore.getStoreState(),
  };
}

const title = 'Uganda Decides';

@withStyles(s)
class UgandaDecidesPage extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = getStateFromStores();
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    UgandaPageStore.addChangeListener(this._onChange);
    if (isBrowser) this.createDcCharts({ map: 'map', line: 'line', table: 'table', pie: 'pie' });
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
    this.dcMap.map().remove();
    UgandaPageStore.removeChangeListener(this._onChange);
  }

  createDcCharts(container) {
    this.charts = new Charts(TestData);
    // line chart
    const dim = this.charts.createDimenion('hour');
    const group = this.charts.createGroup(dim, 'sentiment');
    this.charts.lineChart(dim, group, container.line);
    // map
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
      width: '600px',
      height: '400px',
    };
    return (
      <div className={cx(s.root, 'container')}>
        <header className="row spacing-sm">
          <h3> Twitter Data visualization </h3>
        </header>
        <section>
          <article className="row spacing-sm">
            <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
          </article>
        </section>
        <section>
          <div className="row spacing-sm">
            <div className="col-md-6">
                <div id ="line"></div>
            </div>
            <div className = "col-md-6 ">
              <table id ="table" className= "table table-bordered table-striped">
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
            <div className = "col-md-8">
                <div id ="map" style={divStyle} > </div>
            </div>
            <div className = "col-md-4">
                <div id= "pie"></div>
            </div>
            </div>
        </section>
      </div>
    );
  }

}

export default UgandaDecidesPage;
