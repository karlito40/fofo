import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { formatDistance } from 'date-fns'
import Box from './styled/Box';
import Avatar from './Avatar';
import { Reply } from 'styled-icons/material/Reply';
import { Heart } from 'styled-icons/fa-solid/Heart';
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

export default class extends Component {
  contentRef = React.createRef();

  componentDidMount() {
    this.contentRef.current.querySelectorAll('code')
      .forEach(el => Prism.highlightElement(el));
  }

  render() {
    const { comment, className } = this.props;
    const since = formatDistance(
      new Date(comment.created_at), 
      new Date(), 
      {addSuffix: true}
    );
    
    return (
      <Wrapper className={className}>
        <Header>
          <Avatar user={comment.user}/>
          <Presentation>
            <User>
              <Pseudo>{comment.user.name}</Pseudo>
              <DateDistance>{since}</DateDistance>
            </User>
            <Extra>
              <ReplyIcon size={20}/>
              <HeartIcon size={15} like={comment.like}/>
            </Extra>
          </Presentation>
        </Header>
        <Content ref={this.contentRef} dangerouslySetInnerHTML={{__html: comment.content}}/>
      </Wrapper>
    );
  }
  
}

const cssIcon = `margin-left: 10px;`;

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
