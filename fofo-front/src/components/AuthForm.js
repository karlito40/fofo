import React, { Component } from 'react';
import styled from 'styled-components';
import Box from './styled/Box';

const CONNEXION_TYPE = 'connexion';
const INSCRIPTION_TYPE = 'inscription';

export default class extends Component {
  state = { type: CONNEXION_TYPE }

  toggleType = () => {
    const newType = (this.state.type === CONNEXION_TYPE) 
      ? INSCRIPTION_TYPE 
      : CONNEXION_TYPE;

    this.setState({type: newType});
  }

  render() {
    const { className } = this.props;
    const { type } = this.state;

    return <Wrapper className={className}>
      <WrapperBox>
        <Form>
          <Input type="text" name="email" placeholder="Email"/>
          <Input type="password" name="password" placeholder="Password"/>
          {type === INSCRIPTION_TYPE && <Input type="text" name="pseudo" placeholder="Pseudo"/>} 

          <SubmitButton>
            {type === CONNEXION_TYPE ? 'Connexion' : 'Inscription'} 
          </SubmitButton>
        </Form>
      </WrapperBox>
      <InscriptionButton onClick={this.toggleType}>
      {type === CONNEXION_TYPE ? "S'inscrire" : '<'} 
      </InscriptionButton>
    </Wrapper>
  }
  
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 30px;
  margin-left: 10px;
  display: flex;
`;

const WrapperBox = styled(Box)`
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
`;

