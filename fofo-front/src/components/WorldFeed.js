import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Loader from './Loader';

export default class extends Component {

  handleClick(site) {
    this.props.onSiteClick(site);
  }

  render() {
    const { sites, className, loading } = this.props;
    return <Wrapper className={className}>
      { sites && sites.map(site => 
        <SiteItem key={site.id} active={site.active}>
          <Favicon 
            src={`//s2.googleusercontent.com/s2/favicons?domain=${site.domain}`} 
            alt={site.domain}
            onClick={this.handleClick.bind(this, site)}
          />  
        </SiteItem>
      )}
      { loading && 
        <Item>
          <Loader size={15}/>
        </Item>
      }
    </Wrapper>
  }
}

const Wrapper = styled.div`
  ${p => p.theme.horizontal && css`
    width: 100%;
  `}
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  padding: 8px 0;

  ${p => p.active && css`
    border-left: 3px solid ${p.theme.highlightColor};
  `}

  ${p => p.theme.vertical && css`
    display: none;
  `}
`;

const SiteItem = styled(Item)`
  :hover {
    border-left: 3px solid ${p => p.theme.strongColor};
  }
`;

const Favicon = styled.div`
  width: 18px;
  height: 18px;
  background: url(${p => p.src}) no-repeat;
  background-size: cover;
  border-radius: 5px;
  cursor: pointer;
`;
