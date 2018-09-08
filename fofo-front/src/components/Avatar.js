import React, { Component } from 'react';
import styled from 'styled-components';

export default (props) => {
  const { user } = props;
  return <div>
    <Background src="/images/avatar.png"/>
  </div>
}

const Background = styled.div`
  background: url(${p => p.src}) no-repeat;
  background-size: cover;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;
