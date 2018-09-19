import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Smile } from 'styled-icons/fa-regular/Smile';
import { Send } from 'styled-icons/material/Send';
import { Close } from 'styled-icons/material/Close';
import Loader from './Loader';

export default class extends Component {
  formRef = React.createRef();
  textarea = React.createRef();
  submitButtonRef = React.createRef();

  state = { hasContent: false };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.textarea.current.value);
    this.close();
  }

  handleFocus = (e) => {
    if(e.target !== this.submitButtonRef.current) {
      this.props.onFocus();
    }
  }

  handleChange = (e) => {
    this.handleContent(e.target.value);
  }

  handleBlur = (e) => {
    if(e.relatedTarget === this.submitButtonRef.current || !this.formRef.current.contains(e.relatedTarget)) {
      this.props.onBlur();
    } 
  }

  close = () => {
    this.textarea.current.value = '';
    this.handleContent('');
    this.formRef.current.blur();
  }

  handleContent = (content) => {
    this.setState({hasContent: !!content});
  }

  render() {
    const { className, loading, children, active } = this.props;
    const unfold = (active || this.state.hasContent);

    return <Wrapper 
      className={className} 
      unfold={unfold}
    >
      <Form 
        ref={this.formRef}
        onSubmit={this.onSubmit} 
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        tabIndex="-1">
        <Textarea ref={this.textarea} name="sendMessage" placeholder="Send a message" onChange={this.handleChange}/>
        { loading && <LoaderStyled size={15}/> }
        <Interaction unfold={unfold}>
          <SmileyIcon size={16}/>
          <SubmitButton ref={this.submitButtonRef}>
            <SendIcon size={18}/>
          </SubmitButton>
        </Interaction>
      </Form>
      <CloseIcon onClick={this.close} unfold={unfold} size={20}/>
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
  transition: 0.3s height;
  ${p => p.theme.horizontal && css`
    left: ${p.theme.panelWidth};
  `}

  ${p => p.unfold && css`
    height: 100%;

    textarea {
      padding: 25px 0;
    }
  `}
`;

const Form = styled.form`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Textarea = styled.textarea`
  outline: 0;
  border: 0;
  height: 100%;
  flex: 1;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  color: ${p => p.theme.primaryColor};
  resize: none;

  ::placeholder { 
    font-size: 11px;
    font-family: GothamRoundedBook, Roboto, sans-serif;
    color: ${p => p.theme.primaryColor};
    line-height: ${p => p.theme.messageFormHeight};
  }

  :focus::placeholder {
    visibility: hidden;
    color: red;
  }
`;

const Interaction = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 12px;
  right: 20px;
`;

const cssIcon = `margin-left: 10px; cursor: pointer;`;

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

const SubmitButton = styled.button`
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;  
`;

const CloseIcon = styled(Close)`
  ${cssIcon};

  position: absolute;
  cursor: pointer;
  opacity: 0;
  top: 20px;
  right: 20px;
  ${p => p.unfold && css`
    transition: 0.1s opacity 0.1s;
    opacity: 1;
  `}
`;