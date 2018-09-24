import React, { Component } from 'react';
import styled from 'styled-components';
import Box from './styled/Box';
import Loader from './Loader';
import { ucfirst } from '../lib/String';
import { IsEmail, Required, validateChange, emulateChangeEvent } from '../lib/Validator';

const LOGIN_TYPE = 'login';
const REGISTER_TYPE = 'register';

export default class extends Component {
  wrapperRef = React.createRef();
  
  state = { 
    type: LOGIN_TYPE, 
    emailError: false,
    passwordError: false,
    nameError: false,
  };

  constructor(props) {
    super(props);
    this.form = createForm(this, {
      email: IsEmail(),
      password: Required(),
      name: Required(),
    }, {
      beforeValidation: this.handleBeforeValidation,
      afterValidation: this.handleAfterValidation
    });
  }

  toggleType = () => {
    const newType = (this.state.type === LOGIN_TYPE) 
      ? REGISTER_TYPE 
      : LOGIN_TYPE;

    this.form.ref('email').current.focus();
    this.setState({type: newType});
  }

  handleFocus = () => {
    this.props.onFocus();
  }
  
  handleBlur = (e) => {
    if(!this.wrapperRef.current.contains(e.relatedTarget)) {
      this.props.onBlur();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.props.loading) {
      return false;
    }

    if(this.form.submit()) {
      this.props.onSubmit({
        type: this.state.type,
        email: this.form.ref('email').current.value,
        password: this.form.ref('password').current.value,
        ...(this.state.type === REGISTER_TYPE) && { name: this.form.ref('name').current.value },
      });
    };
    
  }

  handleBeforeValidation = (name, value) => {
    if(this.getErrorFromProps(name)) {
      this.props.resetError(name);
    }
  }

  handleAfterValidation = (name, value) => {
    if(!this.props.filterValidateInput || this.props.filterValidateInput.includes(name)) {
      this.props.onValidateInput(name, value, this.state.type);
    }
  }

  componentDidMount() {
    this.form.ref('email').current.focus();
  }
  
  getErrorFromProps(inputName) {
    const { errors } = this.props;

    let message = null;
    if(errors && errors[inputName]) {
      message = '';
      for(let info of errors[inputName]) {
        message += info + ' ';
      }
    }

    return message;
  }

  getErrorFromFinder(inputName) {
    const { finder } = this.props;
    return (finder[inputName] && finder[inputName].exist) ? ucfirst(inputName) + ' is already taken' : null;
  }

  getErrorFromState(inputName) {
    return this.state[inputName + 'Error'];
  }

  renderError(inputName) {
    let message = this.getErrorFromProps(inputName);
    if(!message) { message = this.getErrorFromFinder(inputName); }
    if(!message) { message = this.getErrorFromState(inputName); }

    return <Error>{message}</Error>
  }

  render() {
    const { className, loading, finder } = this.props;
    const { type } = this.state;
    const isRegisterType = (type === REGISTER_TYPE); 
    const isLoginType = (type === LOGIN_TYPE); 

    return <Wrapper className={className} 
        ref={this.wrapperRef}
        tabIndex="-1"  
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
    >
      <ErrorContainer>
        {this.renderError('email')}
        {this.renderError('password')}
        {isRegisterType && this.renderError('name')}
      </ErrorContainer>

      <ContentContainer>
        <BoxStyled>
          <Form onSubmit={this.handleSubmit}>
            <Input 
              ref={this.form.ref('email')} 
              onChange={this.form.onChange('email')} 
              type="text" 
              name="email" 
              placeholder="Email"
            />
            <InputLoader>
              { finder.email && finder.email.loading && <Loader size={15}/>}
            </InputLoader>
            <Input 
              ref={this.form.ref('password')} 
              onChange={this.form.onChange('password')} 
              type="password" 
              name="password" 
              placeholder="Password" 
            />
            {isRegisterType && 
              <Input 
                ref={this.form.ref('name')} 
                onChange={this.form.onChange('name')} 
                type="text" 
                name="name" 
                placeholder="Pseudo"
                required
              />
            } 
            <InputLoader>
              { finder.name && finder.name.loading && <Loader size={15}/>}
            </InputLoader>

            <SubmitButton>
              {isLoginType ? 'Connexion' : 'Inscription'} 
            </SubmitButton>
          </Form>
        </BoxStyled>
        {loading ? (
          <LoaderWrapper>
            <Loader size={17}/>
          </LoaderWrapper>
        ) : (
          <InscriptionButton onClick={this.toggleType}>
            {isLoginType ? "S'inscrire" : '<'}
          </InscriptionButton>
        )}
      </ContentContainer>
    </Wrapper>
  
  }
}

function constraint(component, name, validator, options = {}) {
  return {
    name,
    ref: React.createRef(),
    validator,
    onChange: validateChange.bind(null, component, {
      validator,
      beforeValidation: options.beforeValidation,
      afterValidation: options.afterValidation,
    }),
    submit() {
      if(!this.ref.current) {
        return true;
      }

      return validateChange(component, {
        validator,
      }, emulateChangeEvent(this.name, this.ref.current.value));
    },
    
  };
}

function createForm(component, constraints, options = {}) {
  const form = {
    constraints: {},
    component: component,

    ref(inputName) {
      return this._getConstraintKey(inputName, 'ref');
    },
    onChange(inputName) {
      return this._getConstraintKey(inputName, 'onChange');
    },
    validator(inputName) {
      return this._getConstraintKey(inputName, 'validator');
    },

    _getConstraintKey(inputName, key) {
      if(!this.constraints[inputName]) {
        return null;
      } 
      
      return this.constraints[inputName][key] ? this.constraints[inputName][key] : null;
    },

    submit() {
      let isOk = true;
      for(let constraint of Object.values(this.constraints)) {
        let submitIsValid = constraint.submit();
        if(isOk && !submitIsValid) {
          isOk = false;
        }
      }

      return isOk;
    }
  };

  for(let [inputName, validator] of Object.entries(constraints)) {
    form.constraints[inputName] = constraint(component, inputName, validator, options);
  }

  return form;
}

const Wrapper = styled.div`
  outline: 0;
  position: absolute;
  bottom: 30px;
  margin-left: 10px;
`;

const ErrorContainer = styled.div`
  margin-bottom: 5px;
  display: flex;
`;

const Error = styled.div`
  padding-left: 10px;
  margin-right: 15px;
  margin-left: 5px;
  font-family: GothamRoundedBook,Roboto,sans-serif;
  width: 170px;
  font-size: 11px;
  color: ${p => p.theme.errorColor};
`;

const ContentContainer = styled.div`
  display: flex;
`;

const BoxStyled = styled(Box)`
  position: relative;
  margin: 0 0 0 5px;
  padding: 12px;
  padding-right: 125px;
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  border: 0;
  outline: 0;
  border-left: 1px solid ${p => p.theme.lightColor};
  padding-left: 10px;
  margin-right: 15px;
  margin-left: 5px;
  font-size: 11px;
  font-family: GothamRoundedBook, Roboto, sans-serif;
  width: 170px; 

  ::placeholder { 
    text-transform: uppercase;
    font-family: GothamRounded, Roboto, sans-serif;
  }

`;

const SubmitButton = styled.button`
  position: absolute;
  background-color: ${p => p.theme.highlightBgColor};
  color: ${p => p.theme.secondaryBgColor};
  text-transform: uppercase;
  border: 0;
  outline: 0;
  height: 100%;
  top: 0;
  right: 0;
  padding: 0 20px;
  font-family: GothamRounded, Roboto, sans-serif;
  cursor: pointer;
`;

const InscriptionButton = styled.button`
  min-width: 40px;
  text-transform: uppercase;
  border: 0;
  outline: 0;
  padding: 12px; 
  box-shadow: ${p => p.theme.primaryBoxShadow};
  margin-left: 20px;
  font-family: GothamRounded, Roboto, sans-serif;
  color: ${p => p.theme.primaryColor};
  cursor: pointer;
  border-radius: 30px;
  background-color: ${p => p.theme.secondaryBgColor};
`;

const LoaderWrapper = styled.div`
  min-width: 40px;
  padding: 12px; 
  box-shadow: ${p => p.theme.primaryBoxShadow};
  margin-left: 20px;
  border-radius: 30px;
  background-color: ${p => p.theme.secondaryBgColor};
`;

const InputLoader = styled.div`
  width: 15px;
  height: 15px;
`;


