import React, { Component } from 'react';
import s from './Feedback.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';

@withStyles(s)
class Feedback extends Component {

  render() {
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
                          <input type="text" className="form-control" id="username" name= "username" placeholder="name" required />
                      </div>
                      <div className={cx('form-group', s.fgroup)}>
                          <input type="email" className="form-control" id="useremail" name="useremail" placeholder="email" required />
                      </div>
                      <button type="submit" className={cx('btn', 'btn-default', s.btn)} id="find_out_more">submit</button>
                  </form>
              </div>
              <div className="row spacing-sm">
                  <div className="col-sm-2">
                      <h3>Akilihub</h3>
                  </div>
                  <div className="col-sm-2 col-sm-offset-8 social">
                      <a href="#"><i className="fa fa-facebook"></i></a>
                      <a href="#"><i className="fa fa-twitter"></i></a>
                  </div>
              </div>
          </section>
        </div>
      </div>
    );
  }

}

export default Feedback;
