import React, { Component } from 'react';
import styled from 'styled-components';
import Box from './styled/Box';
import Loader from './Loader';

const CONNEXION_TYPE = 'login';
const INSCRIPTION_TYPE = 'register';

export default class extends Component {
  wrapperRef = React.createRef();
  emailRef = React.createRef();
  passwordRef = React.createRef();
  pseudoRef = React.createRef();
  
  state = { type: CONNEXION_TYPE };

  toggleType = () => {
    const newType = (this.state.type === CONNEXION_TYPE) 
      ? INSCRIPTION_TYPE 
      : CONNEXION_TYPE;

    this.emailRef.current.focus();
    
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
    
    this.props.onSubmit({
      type: this.state.type,
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
      ...(this.state.type === INSCRIPTION_TYPE) && { name: this.pseudoRef.current.value },
    });
  }

  componentDidMount() {
    this.emailRef.current.focus();
  }

  render() {
    const { className, loading } = this.props;
    const { type } = this.state;

    return <Wrapper className={className} 
        ref={this.wrapperRef}
        tabIndex="-1"  
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
    >
      <BoxStyled>
        <Form onSubmit={this.handleSubmit}>
          <Input ref={this.emailRef} type="text" name="email" placeholder="Email"/>
          <Input ref={this.passwordRef} type="password" name="password" placeholder="Password"/>
          {type === INSCRIPTION_TYPE && <Input ref={this.pseudoRef} type="text" name="pseudo" placeholder="Pseudo"/>} 
          <SubmitButton>
            {type === CONNEXION_TYPE ? 'Connexion' : 'Inscription'} 
          </SubmitButton>
        </Form>
      </BoxStyled>
      {loading ? (
        <LoaderWrapper>
          <Loader size={17}/>
        </LoaderWrapper>
      ) : (
        <InscriptionButton onClick={this.toggleType}>
          {type === CONNEXION_TYPE ? "S'inscrire" : '<'}
        </InscriptionButton>
      )}
    </Wrapper>
  }
}

const Wrapper = styled.div`
  outline: 0;
  position: absolute;
  bottom: 30px;
  margin-left: 10px;
  display: flex;
`;

const BoxStyled = styled(Box)`
  position: relative;
  margin: 0 0 0 5px;
  padding: 12px;
  padding-right: 140px;
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


