import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageForm from '../components/MessageForm';
import { actions as comment } from '../store/form/comment';
import { getState } from '../store';

const mapStateToProps = ({form}) => ({
  loading: form.comment.loading,
  active: form.comment.active
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (content) => dispatch(comment.send(
    getState('app.href'), 
    content,
    getState('app.user'), 
  )),
  onFocus: () => dispatch(comment.active(true)),
  onBlur: () => dispatch(comment.active(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);