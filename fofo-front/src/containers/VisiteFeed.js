import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as appActions } from '../store/app';
import WorldFeed from '../components/WorldFeed';

const mapStateToProps = ({ app }) => ({...app.user.visites});

const mapDispatchToProps = (dispatch) => ({
  onSiteClick: (site) => dispatch(appActions.setAddress(site.domain, '/_channel:#general')),
});
export default connect(mapStateToProps, mapDispatchToProps)(WorldFeed);