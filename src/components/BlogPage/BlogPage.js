/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import s from './BlogPage.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

const title = 'Blog Page';

@withStyles(s)
export default class AboutPage extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentWillUnmount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={cx(s.root, 'container-fluid')}>
        <h2 className={s.logo}>AKILIHUB Talks</h2>
        <hr></hr>
        <header className = "row">
            <ul className={cx('nav', 'navbar-nav', 'navbar-center', s.nav)}>
              <li>
                  <Link className={s.link} to="/blog">General</Link>
              </li>
              <li>
                  <Link className={s.link} to="/">Research and Insight</Link>
              </li>
              <li>
                  <Link className={s.link} to="/uganda">News</Link>
              </li>
              <li>
                  <Link className={s.link} to="/blog">Tech</Link>
              </li>
            </ul>
        </header>
        <hr></hr>
        <section className= {cx('container', s.container)}>
          <div className= {cx('col-md-9', s.main)}>
            <div className ="row spacing">
              <article className="col-md-12">
                <header>
                  <h3> What skills should data scientist Have</h3>
                </header>
                <div className="text-justify" dangerouslySetInnerHTML={{ __html: this.props.content || '' }}></div>
                <a href="#"> Read more</a>
                <hr></hr>
              </article>
            </div>
            <div className ="row spacing">
              <article className="col-md-12">
                <header>
                  <h3> Natural Languge Processing</h3>
                </header>
                <div className="text-justify" dangerouslySetInnerHTML={{ __html: this.props.content || '' }}></div>
                <a href="#"> Read more</a>
                <hr></hr>
              </article>
            </div>
            <div className ="row spacing">
              <article className="col-md-12">
                <header>
                  <h3>Machine learning and Statistics</h3>
                </header>
                <div className="text-justify" dangerouslySetInnerHTML={{ __html: this.props.content || '' }}></div>
                <a href="#"> Read more</a>
                <hr></hr>
              </article>
            </div>
          </div>
          <div className= {cx('col-md-3', s.sidebar)}>
            <header className= "row">
              <h3>Top Articles</h3>
              <hr></hr>
            </header>
            <section>
              <div className = "row spacing">
                <header>
                  <Link className={s.link} to="/blog"> Machine learning</Link>
                </header>
                <hr></hr>
              </div>
              <div className = "row spacing">
                <header>
                  <Link className={s.link} to="/blog"> Data Mining</Link>
                </header>
                <hr></hr>
              </div>
              <div className = "row spacing">
                <header>
                  <Link className={s.link} to="/blog">Natural Language Processing </Link>
                </header>
                <hr></hr>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}
