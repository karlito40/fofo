import React, { Component } from 'react';
import styled, { css } from 'styled-components';

export default (props) => {
  
  return <Wrapper>
    <Link>feed</Link>
    <Link>favorites</Link>
    <Link>test.com</Link>
    <Link>projects.html</Link> 
  </Wrapper>
  
}

const Wrapper = styled.div`
  padding: 10px 30px;
  
  ${p => p.theme.horizontal && css`
    display: none;
  `} 
`;

const Link = styled.span`
  color: ${p => !p.current ? p.theme.highlightColor : false};
  
  :after {
    content: '/';
    color: ${p => p.theme.primaryColor};
    margin: 0 5px;
  }

  :last-child:after {
    content: '';    
  }
`;
