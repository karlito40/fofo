import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import BaseComment from './Comment';

export default class extends Component {
  render() {
    const { comments, className } = this.props;

    return <Wrapper className={className}>
      { comments.map(comment => <Comment key={comment.id} comment={comment}/>) }
    </Wrapper>
  }
}

const Wrapper = styled.div`
  padding-top: 1px;
`;

const Comment = styled(BaseComment)`
  ${p => p.theme.vertical && css`
    :first-child {
      margin-top: 0px;
    }
  `}
`;
