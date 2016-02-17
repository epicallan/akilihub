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
        <h1 className="page-title">AKILIHUB Blogs</h1>
        <hr></hr>
        <header className = "row">
            <ul id = "sub-menu-override" className={cx('nav', 'navbar-nav', 'navbar-center', 'sub-menu', s.nav)}>
              <li>
                  <Link className={s.link} to="/blog">Data Visualisation</Link>
              </li>
            </ul>
        </header>
        <hr></hr>
        <section className= {cx(s.container)}>
          <div className= {cx(s.main)}>
            <div className ="row spacing">
              <div className = "col-md-9">
                <article className={cx('articles')}>
                  <header>
                    <h2> Twitter data Visualisation Dashboard: The hows and whats </h2>
                  </header>
                  <div className="text-justify">
                    <div className="text-justify" dangerouslySetInnerHTML={{ __html: this.props.content || '' }}></div>
                  </div>
                  <hr></hr>
                </article>
              </div>
              <div className= {cx('col-md-3', s.sidebar)}>
                <header className= "row">
                  <h3>Top Articles</h3>
                  <hr></hr>
                </header>
                <section>
                  <div className = "row spacing">
                    <header>
                      <Link className={s.link} to="/blog"> Twitter data Visualisation Dashboard</Link>
                    </header>
                    <hr></hr>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
