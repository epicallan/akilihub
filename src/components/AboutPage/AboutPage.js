/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import s from './UgandaPage.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
// import Link from '../Link';

const title = 'About Page';

@withStyles(s)
export default class AboutPage extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    path: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.path = props.path;
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={cx(s.root, 'container')}>
        <section className= {cx('row', s.content)}>
          <div className= {cx('col-md-9', s.sidebar)}>
              <h4>Data Innovation 101</h4>
          </div>
          <div className= {cx('col-md-9', s.main)}>
          </div>
        </section>
      </div>
    );
  }
}
