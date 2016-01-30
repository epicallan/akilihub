import React, { Component, PropTypes } from 'react';
import s from './ContactPage.scss';
import withStyles from '../../decorators/withStyles';

const title = 'Contact Us';

@withStyles(s)
class ContactPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2 className = "spacing-sm">Coming Soon...</h2>
          <p>Please Contact us through our Social Media Channels or leave us Your email through the Find out more form Below</p>
          <p>Thanks For Your Interest</p>
        </div>
      </div>
    );
  }

}

export default ContactPage;
