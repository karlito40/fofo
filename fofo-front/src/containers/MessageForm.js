import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageForm from '../components/MessageForm';
import { actions as comment } from '../store/comment';
import { getState } from '../store';

const mapStateToProps = ({feed}) => ({
  loading: feed.page.loadingForm,
  lastSent: feed.page.lastSent
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (content) => dispatch(comment.send(
    getState('app.href'), 
    content,
    getState('app.user'), 
  ))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);