import React, { Component } from 'react';
import { connect } from 'react-redux';
import Flash from '../components/Flash';
import { actions as flashActions } from '../store/flash';

const mapStateToProps = ({flash}) => ({
  message: flash.messages[0]
});

const mapDispatchToProps = (dispatch) => ({
  onComplete: () => dispatch(flashActions.next()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Flash);