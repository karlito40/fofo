import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import BoxStyle from './styled/Box';

export default (props) => {
  const { page, className} = props;
  return (
    <BoxStyle className={className}>
      <Link highlight={page.newMessages}>{page.uri}</Link>
      <Title>{page.title}</Title>
    </BoxStyle>
  )
}

const Link = styled.div`
  color: ${p => p.highlight ? p.theme.highlightColor : p.theme.strongColor};
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-style: italic;
`;

