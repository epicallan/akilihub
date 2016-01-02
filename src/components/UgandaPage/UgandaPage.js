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

  static propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    // this.props.path = this.props.title;
  }

  componentDidMount() {
    UgandaPageStore.addChangeListener(this._onChange);
    // this.createDcCharts(this.state.data, 'lineChart');
    this.createDcCharts(TestData, { map: 'map', line: 'line' });
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
    UgandaPageStore.removeChangeListener(this._onChange);
  }

  createDcCharts(data, container) {
    const dcChart = new Charts(data);
    const dim = dcChart.createDimenion('hour');
    const group = dcChart.createGroup(dim, 'sentiment');
    dcChart.lineChart(dim, group, container.line);
    const facilities = dcChart.createDimenion('geo');
    const facilitiesGroup = facilities.group().reduceCount();
    dcChart.mapChart(facilities, facilitiesGroup, container.map);
    dcChart.drawAll();
  }
  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    this.context.onSetTitle(this.props.title);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.holder}>
            <div id ="line"> </div>
            <div id ="map" className={s.map}> </div>
          </div>
        </div>
      </div>
    );
  }

}

export default UgandaDecidesPage;
