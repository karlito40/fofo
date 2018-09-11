import React, { Component } from 'react';
import WorldFeed from '../components/WorldFeed';
import { connect } from 'react-redux';

const mapStateToProps = ({ app }) => ({
  sites: app.me.visites,
  loading: app.me.loadingVisites
});

export default connect(mapStateToProps)(WorldFeed);
 