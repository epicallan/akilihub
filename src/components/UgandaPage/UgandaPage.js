/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import s from './UgandaPage.scss';
import withStyles from '../../decorators/withStyles';
import UgandaPageStore from '../../stores/UgandaPageStore';

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

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    this.context.onSetTitle(this.props.title);
    const content = JSON.stringify(this.state.data);
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: content || '' }} />
        </div>
      </div>
    );
  }

}

export default UgandaDecidesPage;
