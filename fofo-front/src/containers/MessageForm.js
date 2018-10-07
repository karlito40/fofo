import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageForm from '../components/MessageForm';
import { actions as comment } from '../store/form/comment';
import { actions as auth } from '../store/form/auth';
import { getState } from '../store';

const mapStateToProps = ({app, form}) => ({
  loading: form.comment.create.loading,
  active: form.comment.create.active,
  isLogged: app.user.isLogged
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (content) => dispatch(comment.create(
    getState('app.href'), 
    content,
    getState('app.user'), 
  )),
  onForbiddenNewContent: () => dispatch(auth.active(true)),
  onFocus: () => dispatch(comment.activeCreation(true)),
  onBlur: () => dispatch(comment.activeCreation(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);