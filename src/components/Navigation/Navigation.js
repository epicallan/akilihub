import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import { Navbar, Nav } from 'react-bootstrap';

@withStyles(s)
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };
  componentDidMount() {
    // window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
    // if (this.nav) this.nav.className.remove(s['nav-scroll']);
  }

  handleScroll = () => {
    this.nav = this.refs.nav;
    this.nav.className += ` ${s['nav-scroll']}`;
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <Navbar id = "navbar-override" fixedTop className={cx('navbar', s.navbar)} ref = "nav" >
       <Navbar.Header>
         <Navbar.Toggle />
       </Navbar.Header>
       <Navbar.Collapse>
         <Nav>
           <li>
             <Link className={s.link} to="/">Home</Link>
           </li>
           <li>
             <Link className={s.link} to="/data">Data Center</Link>
           </li>
           <li>
             <Link className={s.link} to="/blog">Blog</Link>
           </li>
         </Nav>
         <Nav pullRight>
           <li>
              <Link className={s.link} to="/contact">Contact Us</Link>
           </li>
         </Nav>
       </Navbar.Collapse>
     </Navbar>
    );
  }

}

export default Navigation;
