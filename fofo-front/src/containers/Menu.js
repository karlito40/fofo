import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../components/Menu';

const mapStateToProps = ({app}) => ({
  user: app.user
});

export default connect(mapStateToProps)(Menu);