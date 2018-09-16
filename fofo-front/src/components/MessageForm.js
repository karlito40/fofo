import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Smile } from 'styled-icons/fa-regular/Smile';
import { Send } from 'styled-icons/material/Send';
import Loader from './Loader';

export default class extends Component {

  input = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.input.current.value);
    this.input.current.value = '';
  }

  render() {
    const { className, loading, children } = this.props;

    return <Wrapper className={className}>
      <Form onSubmit={this.onSubmit} onFocus={this.props.onFocus} onBlur={this.props.onBlur}>
        <Input ref={this.input} type="text" name="sendMessage" placeholder="Send a message"/>
        { loading && <LoaderStyled size={15}/> }
        <Interaction>
          <SmileyIcon size={16}/>
          <ButtonSubmit>
            <SendIcon size={18}/>
          </ButtonSubmit>
        </Interaction>
      </Form>
      { children }
    </Wrapper>
  }
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  height: ${p => p.theme.messageFormHeight};
  padding: 0 25px 0 30px;
  box-shadow: ${p => p.theme.primaryBoxShadow};
  background-color: ${p => p.theme.secondaryBgColor};
  right: 0;
  left: 0;

  ${p => p.theme.horizontal && css`
    left: ${p.theme.panelWidth};
  `}
`;

const Form = styled.form`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Input = styled.input`
  outline: 0;
  border: 0;
  height: 100%;
  font-family: GothamRoundedBook, Roboto, sans-serif;
  flex: 1;

  ::placeholder { 
    color: ${p => p.theme.primaryColor};
  }
`;

const Interaction = styled.div`
  display: flex;
  align-items: center;
`;

const cssIcon = `margin-left: 10px;`;

const SmileyIcon = styled(Smile)`
  ${cssIcon}
  color: ${p => p.theme.lightColor};
`;

const SendIcon = styled(Send)`
  ${cssIcon}
  fill: ${p => p.theme.highlightColor};
`;

const LoaderStyled = styled(Loader)`
  margin-top: 2px;
`;

const ButtonSubmit = styled.button`
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;  
`;