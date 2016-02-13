import React, { Component } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Navigation from '../Navigation';

@withStyles(s)
class Header extends Component {

  render() {
    return (
      <section className={s.root}>
        <div className={s.container}>
          <Navigation className={s.nav} />
        </div>
      </section>
    );
  }

}

export default Header;
