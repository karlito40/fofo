import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Comment from './Comment';
import Loader from './Loader';

export default class extends Component {
  render() {
    const { comments, className, loading } = this.props;

    return <Wrapper className={className}>
      {loading 
        ? <Loader center/>
        : comments.map(comment => <CommentStyled key={comment.id} comment={comment}/>)
      }
    </Wrapper>
  }
}

const Wrapper = styled.div`
  padding-top: 1px;
  min-height: 100vh;
  padding-bottom: ${p => p.theme.messageFormHeight};
`;

const CommentStyled = styled(Comment)`
  ${p => p.theme.vertical && css`
    :first-child {
      margin-top: 0px;
    }
  `}
`;
