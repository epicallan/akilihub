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
                  <Link className={s.link} to="/blog">Future Blog Category</Link>
              </li>
            </ul>
        </header>
        <hr></hr>
        <section className= {cx(s.container)}>
          <div className= {cx('col-md-9', s.main)}>
            <div className ="row spacing">
              <article className={cx('articles')}>
                <header>
                  <h3> Future Title For A Cool Blog</h3>
                </header>
                <div className="text-justify">
                  <p>Coming soon.........</p>
                </div>
                <a href="#"> Read more</a>
                <hr></hr>
              </article>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
