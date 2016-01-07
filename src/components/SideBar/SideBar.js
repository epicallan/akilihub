import React, { Component } from 'react';
import s from './sidebar.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
export default class SideBar extends Component {
  render() {
    return (
      <div className= {cx('col-md-3', s.sidebar)}>
        <header className={cx(s.spacing, 'row')}>
          <div className="col-md-12">
            <h4>Data Center Home</h4>
            <hr></hr>
          </div>
        </header>
        <section className="menue row">
          <div className="col-md-12">
            <header>
              <h4>Uganda Decides</h4>
              <ul>
                <li>
                  <Link className={s.link} to="/uganda">Social Media Activity</Link>
                </li>
                <li>
                  <Link className={s.link} to="/uganda">Election Trail</Link>
                </li>
              </ul>
              <hr></hr>
            </header>
            <header>
              <h4>PlayGround</h4>
              <ul>
                <li>
                  <Link className={s.link} to="/uganda">Schools in Uganda</Link>
                </li>
                <li>
                  <Link className={s.link} to="/uganda">Umeme Shutdown</Link>
                </li>
              </ul>
              <hr></hr>
            </header>
          </div>
        </section>
      </div>
    );
  }
}
