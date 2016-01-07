/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.nav) this.nav.className.remove(s['nav-scroll']);
  }

  handleScroll = () => {
    this.nav = this.refs.nav;
    this.nav.className += ` ${s['nav-scroll']}`;
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <nav className={cx('navbar', s.navbar, 'navbar-fixed-top')} ref = "nav">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className={cx(s.root, this.props.className, s.collapse, 'navbar-collapse', 'collapse')} role="navigation">
            <ul className="nav navbar-nav navbar-center">
              <li>
                <Link className={s.link} to="/">Home</Link>
              </li>
              <li>
                <Link className={s.link} to="/uganda">Uganda</Link>
              </li>
              <li>
                <Link className={s.link} to="/about">About</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link className={s.link} to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}

export default Navigation;
