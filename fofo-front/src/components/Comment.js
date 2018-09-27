import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
// import loadLanguages from 'prismjs/components/index';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-c.min.js';
import 'prismjs/components/prism-css.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-java.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-go.min.js';
import 'prismjs/components/prism-swift.min.js';
import React, { Component } from 'react';
import TurndownService from 'turndown';
import styled, { css } from 'styled-components';
import { formatDistance } from 'date-fns'
import { Reply } from 'styled-icons/material/Reply';
import { Heart } from 'styled-icons/fa-solid/Heart';
import { Edit } from 'styled-icons/material/Edit';
import Box from './styled/Box';
import Avatar from './Avatar';
import Loader from './Loader';
 
const turndownService = new TurndownService({
  codeBlockStyle: 'fenced'
});

export default class extends Component {
  contentRef = React.createRef();
  textarea = React.createRef();

  state = { isEditing: false };
  
  startEdit = () => {
    this.setState({isEditing: true});
  }

  resizeTextarea = () => {
    const textareaEl = this.textarea.current;
    textareaEl.style.height = textareaEl.scrollHeight + 'px';
  }

  saveChange = () => {
    this.props.onEdit(this.props.comment.id, this.textarea.current.value);
    this.setState({isEditing: false});
  }

  codeHighlighting() {
    this.contentRef.current
      .querySelectorAll('code')
      .forEach(el => Prism.highlightElement(el));
  }

  componentDidMount() {
    this.codeHighlighting();
  }

  componentDidUpdate(prevProps, prevState) {
    
    if(this.state.isEditing && !prevState.isEditing) { // On rentre en mode edition
      this.resizeTextarea();
      this.textarea.current.focus();
    } 
    // On sort du mode edition 
    // ou le contenu a changé
    else if(
      !this.state.isEditing && prevState.isEditing 
      || this.props.comment.content !== prevProps.comment.content
    ) { 
      this.codeHighlighting();
    }

  }

  render() {
    const { className, comment } = this.props;
    const { id, user, isEditable, like, created_at, content } = comment;
    const { isEditing } = this.state;

    const since = formatDistance(
      new Date(created_at), 
      new Date(), 
      {addSuffix: true}
    );
    
    return (
      <Wrapper className={className}>
        <Header>
          <Avatar user={user}/>
          <Presentation>
            <User>
              <Pseudo>{user.name}</Pseudo>
              <DateDistance>{since}</DateDistance>
            </User>
            <Extra>
              {/* <ReplyIcon size={20}/> */}
              {isEditable && <EditIcon size={17} onClick={this.startEdit}/>}
              {/* <HeartIcon size={15} like={like} onClick={this.props.onLike.bind(null, id, !like)}/> */}
            </Extra>
          </Presentation>
        </Header>

        {isEditing
          ? <Textarea 
              ref={this.textarea} 
              defaultValue={turndownService.turndown(content)}
              onChange={this.resizeTextarea}
              onBlur={this.saveChange}/>
          : <Content ref={this.contentRef} dangerouslySetInnerHTML={{__html: content}}/> 
        }

        {/* {loading && <Loader size={20}/>} */}
      </Wrapper>
    );
  }
}

const cssIcon = `
  margin-left: 10px;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  border: 0;
  width: 100%;
  background-color: #f9f9f9;
  resize: none;
  outline: 0;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  color: ${p => p.theme.primaryColor};
  border-left: 3px solid #39dd92;
  padding: 20px;
`;

const Wrapper = styled(Box)`
  margin: 30px;
  padding: 30px;
`;

const HeartIcon = styled(Heart)`
  ${cssIcon};
  ${p => p.like && css`
    color: #eb6d58;
  `}
`;

const ReplyIcon = styled(Reply)`
  ${cssIcon};
`;

const EditIcon = styled(Edit)`
  ${cssIcon};
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const Presentation = styled.div`
  display: flex;
  margin-left: 15px;
  align-items: center;
  flex: 1;
  font-family: GothamRoundedBook, Roboto, sans-serif;
`;

const Extra = styled.div`
  display: flex;
  align-items: center;
`;

const User = styled.div`
  flex: 1;
`;

const Pseudo = styled.div`
  font-size: ${p => p.theme.titleFontSize};
`;

const DateDistance = styled.div`
  font-size: ${p => p.theme.minFontSize};
  color: ${p => p.theme.lightColor};
`;

const Content = styled.div`
  p, blockquote, pre {
    & { margin: 0 !important; margin-bottom: 15px !important; }
    &:last-child { margin-bottom: 0 !important; }
  }
`;
