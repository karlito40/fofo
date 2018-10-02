import React, { Component } from 'react';
import styled from 'styled-components';

export default (props) => {
  const { user, size } = props;
  return user.avatar
    ? <Background size={size} src={user.avatar}/>
    : null;
}

const defaultSize = 40;

const Background = styled.div`
  background: url(${p => p.src}) no-repeat;
  background-size: cover;
  height: ${p => p.size || defaultSize}px;
  width: ${p => p.size || defaultSize}px;
  border-radius: 50%;
`;
