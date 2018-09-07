import React from 'react';
import styled from "styled-components";
import Menu from './Menu';
import FeedSite from './FeedSite';
import FeedPage from './FeedPage';

const Wrapper = styled.div` 
  position: relative; 
`;

const sites = [
  {name: 'medium.com', ico: '/images/medium-favicon.ico'},
  {name: 'medium.com', ico: '/images/medium-favicon.ico'},
  {name: 'medium.com', ico: '/images/medium-favicon.ico'},
];

export default () => {
  return <Wrapper>
    Lalal
    <Menu sites={sites}></Menu>
    <FeedSite></FeedSite>
    <FeedPage></FeedPage>
  </Wrapper>
}