import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Smile } from 'styled-icons/fa-regular/Smile';
import { Send } from 'styled-icons/material/Send';
import { Close } from 'styled-icons/material/Close';
import Loader from './Loader';
import EmojiPicker from './EmojiPicker';

export default class extends Component {
  formRef = React.createRef();
  textarea = React.createRef();
  submitButtonRef = React.createRef();
  emojiActionRef = React.createRef();
  smileyRef = React.createRef();

  state = { hasContent: false, showEmojiPicker: false };

  selectEmoji = (emoji) => {
    const newContent = this.textarea.current.value + emoji;
    this.textarea.current.value = newContent;
    this.setContent(newContent);
  }

  onEmojiActionClick = (e) => {
    // On toggle le selecteur d'emoji lorsque le smiley est cliqué
    // C'est à dire quand la cible est à l'intérieur du bouton emojiAction
    // ou quand la cible est le bouton lui même
    if([this.smileyRef.current].includes(e.target)
      || this.smileyRef.current.contains(e.target)
      || e.target === this.emojiActionRef
    ) {
      this.setState({showEmojiPicker: !this.state.showEmojiPicker});
    } 
  }

  onEmojiActionBlur = (e) => {
    this.setState({showEmojiPicker: false});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.textarea.current.value);
    this.close();
  }

  handleFocus = (e) => {
    // On ne prend pas en compte le focus sur le bouton submit
    // pour pouvoir replier le formulaire
    if(e.target !== this.submitButtonRef.current) {
      this.props.onFocus();
    }
  }

  handleBlur = (e) => {
    // Quand le blur tombe sur le bouton submit on autorise
    // le trigger du onBlur puisque le formulaire est envoyé.
    if(e.relatedTarget === this.submitButtonRef.current 
      || !this.formRef.current.contains(e.relatedTarget)
    ) {
      this.props.onBlur();
    } 
  }

  handleChange = (e) => {
    this.setContent(e.target.value);
  }

  close = () => {
    this.textarea.current.value = '';
    this.setContent('');
    this.formRef.current.blur();
  }

  setContent = (content) => {
    this.setState({hasContent: !!content});
  }

  render() {
    const { className, loading, children, active } = this.props;
    const { showEmojiPicker } = this.state;
    const unfold = (active || this.state.hasContent);

    return <Wrapper className={className} unfold={unfold}>

      <CloseIcon onClick={this.close} unfold={unfold} size={20}/>

      <Form 
        ref={this.formRef}
        onSubmit={this.onSubmit} 
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        tabIndex="-1">

        <Textarea 
          ref={this.textarea} 
          name="sendMessage" 
          placeholder={unfold ? '' : "Send a message"} 
          onChange={this.handleChange}/>

        { loading && <LoaderStyled size={15}/> }

        <Interaction unfold={unfold}>
          <EmojiAction 
            ref={this.emojiActionRef}
            onClick={this.onEmojiActionClick} 
            onBlur={this.onEmojiActionBlur}
            tabIndex="-1"
          >
            <SmileyIcon ref={this.smileyRef} size={16}/>
            { showEmojiPicker && <EmojiPicker onSelect={this.selectEmoji}/> }
          </EmojiAction>
          
          <SubmitButton ref={this.submitButtonRef}>
            <SendIcon size={18}/>
          </SubmitButton>
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
  outline: 0;
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
  }
`;

const Interaction = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 12px;
  right: 20px;
`;

const cssIconContainer = `
  margin-left: 10px; 
  cursor: pointer;
  display: flex;
`;

const SmileyIcon = styled(Smile)`
  color: ${p => p.theme.lightColor};
`;

const SendIcon = styled(Send)`
  fill: ${p => p.theme.highlightColor};
`;

const LoaderStyled = styled(Loader)`
  margin-top: 2px;
`;

const EmojiAction = styled.div`
  ${cssIconContainer};
  outline: 0;
  position: relative;
`;

const SubmitButton = styled.button`
  ${cssIconContainer};
  padding: 0;
  border: 0;
  outline: 0;
  background-color: ${p => p.theme.secondaryBgColor};
`;

const CloseIcon = styled(Close)`
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