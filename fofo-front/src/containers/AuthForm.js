import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { actions as auth } from '../store/form/auth';

class AuthFormContainer extends Component {

  render() {
    const { display } = this.props;
    return <React.Fragment>
      { display && <AuthForm {...this.props}/>}
    </React.Fragment>
    
  }
}

const mapStateToProps = ({app, form}) => ({
  display: !app.user.isLogged && (form.comment.active || form.auth.active),
  loading: form.auth.loading
});

const mapDispatchToProps = (dispatch) => ({
  onFocus: () => dispatch(auth.active(true)),
  onBlur: () => dispatch(auth.active(false)),
  onSubmit: (data) => dispatch(auth[data.type](data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormContainer);