import React, { Component } from 'react';
import s from './Feedback.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import fetch from '../../core/fetch';

@withStyles(s)
class Feedback extends Component {

  findOutMore = async(event) => {
    event.preventDefault();
    const name = this.refs.name.value;
    const email = this.refs.email.value;
    if (name.length > 2 && email.length > 5) {
      const response = await fetch('/api/inquiries', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      if (data.status === 'success') alert('your Inquiry has been received');
    }
  }

  render = () => {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <section>
            <div className="row spacing">
              <header className="text-center center spacing-sm">
                <h3 className="spacing">Find out More</h3>
              </header>
              <form className="form-inline  spacing text-center" id="inquiry" method="POST">
                <div className={cx('form-group', s.fgroup)}>
                  <input type="text" className="form-control" id="username" ref="name" placeholder="name" required/>
                </div>
                <div className={cx('form-group', s.fgroup)}>
                  <input type="email" className="form-control" id="useremail" ref="email" placeholder="email" required/>
                </div>
                <button type="submit" onClick={this.findOutMore.bind(this)} className={cx('btn', 'btn-default', s.btn)} id="find_out_more">submit</button>
              </form>
            </div>
            <div className="row spacing-sm">
              <div className="col-sm-2">
                <h3>Akilihub</h3>
              </div>
              <div className="col-sm-2 col-sm-offset-8 social">
                <a href="https://www.facebook.com/akilihubio-1053352951374980">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="https://twitter.com/akilihub_io">
                  <i className="fa fa-twitter"></i>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

}

export default Feedback;
