import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { actions as auth } from '../store/form/auth';
import debounce from 'lodash.debounce';

class AuthFormContainer extends Component {
  componentWillUnmount() {
    this.props.reset();
  }
  
  render() {
    const { display } = this.props;
    return <React.Fragment>
      { display && <AuthForm {...this.props}/>}
    </React.Fragment>
  }
}

const mapStateToProps = ({app, form}) => ({
  display: !app.user.isLogged && (form.comment.active || form.auth.active),
  loading: form.auth.loading,
  finder: form.auth.finder,
  errors: form.auth.errors,
  filterValidateInput: ['email', 'name'],
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(auth.reset()),
  resetError: (name) => dispatch(auth.resetError(name)),
  onFocus: () => dispatch(auth.active(true)),
  onBlur: () => {
    dispatch(auth.active(false));
    dispatch(auth.reset());
  },
  onSubmit: (data) => dispatch(auth[data.type](data)),
  onValidateInput: debounce((name, value, type) => {
    if(type === 'login' && name === 'email') {
      return true;
    }
    
    return dispatch(auth.findUser({[name]: value}));
  }, 200)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormContainer);