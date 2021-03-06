import React, { Component } from 'react';
import s from './Footer.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Footer extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>© Akilihub</span>
          <span className={s.spacer}>·</span>
          <a className={s.link} href="/" onClick={Link.handleClick}>Home</a>
          </div>
      </div>
    );
  }

}

export default Footer;
