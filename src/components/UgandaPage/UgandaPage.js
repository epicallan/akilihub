/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import s from './UgandaPage.scss';
import withStyles from '../../decorators/withStyles';
import UgandaPageStore from '../../stores/UgandaPageStore';
import DcCharts from '../Charts/Dc/DcCharts';

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
  }

  componentDidMount() {
    UgandaPageStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
    UgandaPageStore.removeChangeListener(this._onChange);
  }
  getDcCharts(data, container) {
    const dcChart = new DcCharts(data);
    const dim = dcChart.createDimenion('date');
    const group = dcChart.createGroup(dim, 'sentiment');
    /* eslint-disable no-console */
    console.log(group);
    return dcChart.lineChart(dim, group, container);
  }
  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    this.context.onSetTitle(this.props.title);
    const content = JSON.stringify(this.state.data);
    this.getDcCharts(content, 'lineChart');
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div id ="lineChart"></div>
        </div>
      </div>
    );
  }

}

export default UgandaDecidesPage;
