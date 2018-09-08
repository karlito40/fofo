import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Comment from './Comment';

export default class extends Component {
  render() {
    const { comments, className } = this.props;

    return <Wrapper className={className}>
      { comments.map(comment => <Comment key={comment.id} comment={comment}/>) }
    </Wrapper>
  }
}

const Wrapper = styled.div`
  padding-bottom: 45px;
  background-color: ${p => p.theme.primaryBgColor};
`;

