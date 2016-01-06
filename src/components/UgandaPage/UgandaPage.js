/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import s from './UgandaPage.scss';
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
    if (isBrowser) this.createDcCharts({ map: 'map', line: 'line' });
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
    this.dcMap.map().remove();
    UgandaPageStore.removeChangeListener(this._onChange);
  }

  createDcCharts(container) {
    this.charts = new Charts(TestData);
    const dim = this.charts.createDimenion('hour');
    const group = this.charts.createGroup(dim, 'sentiment');
    this.charts.lineChart(dim, group, container.line);
    const facilities = this.charts.createDimenion('geo');
    const facilitiesGroup = facilities.group().reduceCount();
    this.dcMap = this.charts.mapChart(facilities, facilitiesGroup, container.map);
    // console.log(this.dcMap);
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
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.holder}>
            <div id ="line"> </div>
            <div id ="map" style={divStyle} > </div>
          </div>
        </div>
      </div>
    );
  }

}

export default UgandaDecidesPage;
