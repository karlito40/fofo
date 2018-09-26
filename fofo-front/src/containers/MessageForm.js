import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageForm from '../components/MessageForm';
import { actions as comment } from '../store/form/comment';
import { getState } from '../store';

const mapStateToProps = ({form}) => ({
  loading: form.comment.create.loading,
  active: form.comment.create.active
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (content) => dispatch(comment.create(
    getState('app.href'), 
    content,
    getState('app.user'), 
  )),
  onFocus: () => dispatch(comment.activeCreation(true)),
  onBlur: () => dispatch(comment.activeCreation(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);