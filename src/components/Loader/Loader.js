import React, { Component } from 'react';
import s from './Loader.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
export default class Loader extends Component {
  render() {
    return (
      <p className= "text-center">
        <span className={cx(s.ouro, s.ouo2)}>
          <span className={s.left}><span className={s.anim}></span></span>
          <span className={s.right}><span className={s.anim}></span></span>
        </span>
      </p>
    );
  }
}
