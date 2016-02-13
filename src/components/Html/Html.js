import React, { Component, PropTypes } from 'react';
import { googleAnalyticsId } from '../../config';
class Html extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    css: PropTypes.string,
    body: PropTypes.string.isRequired,
    entry: PropTypes.string.isRequired,
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  trackingCode() {
    return ({ __html:
      `(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=` +
      `function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;` +
      `e=o.createElement(i);r=o.getElementsByTagName(i)[0];` +
      `e.src='https://www.google-analytics.com/analytics.js';` +
      `r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));` +
      `ga('create','${googleAnalyticsId}','auto');ga('send','pageview');`,
    });
  }

  render() {
    return (
      <html className="no-js" lang="">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="stylesheet" href= "screen.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dc/1.7.5/dc.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/0.4.0/MarkerCluster.Default.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/0.4.0/MarkerCluster.css" />
        <link rel="stylesheet" href="//cdn.datatables.net/1.10.10/css/jquery.dataTables.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" crossOrigin="anonymous" />
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
        <link rel="stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.css" />
        <style id="css" dangerouslySetInnerHTML={{ __html: this.props.css }} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />
        <script src={this.props.entry}></script>
      </body>
      </html>
    );
  }

}

export default Html;
