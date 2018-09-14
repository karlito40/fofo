import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageForm from '../components/MessageForm';
import { actions as feedPage } from '../store/feed/page';
import { getState } from '../store';

const mapStateToProps = ({feed}) => ({
  loading: feed.page.loadingForm,
  lastSent: feed.page.lastSent
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (message) => dispatch(feedPage.sendMessage(getState('app.href'), message))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);