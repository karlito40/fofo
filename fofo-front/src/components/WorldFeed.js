import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Loader from './Loader';

export default class extends Component {
  render() {
    const { sites, className, loading } = this.props;
    return <Wrapper className={className}>
      { sites && sites.map(getFavicon) }
      { loading && <Loader size={15}/> }
    </Wrapper>
  }
}

function getFavicon(site) {
  return <Favicon 
    key={site.id}
    src={`//s2.googleusercontent.com/s2/favicons?domain=${site.domain}`} 
    alt={site.domain}
  />
}

const Wrapper = styled.div`
`;


const Favicon = styled.div`
  width: 18px;
  height: 18px;
  background: url(${p => p.src}) no-repeat;
  background-size: cover;
  border-radius: 5px;
  
  ${p => p.theme.horizontal && css`
    margin-bottom: 15px;
  `}

  ${p => p.theme.vertical && css`
    display: none;
  `}
`;
