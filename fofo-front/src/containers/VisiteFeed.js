import React, { Component } from 'react';
import WorldFeed from '../components/WorldFeed';
import { connect } from 'react-redux';

const mapStateToProps = ({ app }) => ({...app.user.visites});

export default connect(mapStateToProps)(WorldFeed);
 