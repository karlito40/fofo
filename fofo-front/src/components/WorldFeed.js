import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Loader from './Loader';
import Hint from '../shared/components/Hint';

export default class extends Component {

  handleClick(site) {
    this.props.onSiteClick(site);
  }

  render() {
    const { sites, className, loading } = this.props;
    
    return <Wrapper className={className}>
      { sites && sites.map(site => 
        <SiteItem key={site.id} active={site.active} onClick={this.handleClick.bind(this, site)}>
          <Hint>{site.domain}</Hint>
          <Favicon 
            src={`//s2.googleusercontent.com/s2/favicons?domain=${site.domain}`} 
            hasNew={site.has_new_comment}
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
  justify-content: center;
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
  position: relative;
  cursor: pointer;
`;

const Favicon = styled.div`
  width: 18px;
  height: 18px;
  background: url(${p => p.src}) no-repeat;
  background-size: cover;
  border-radius: 5px;
  position: relative;

   ${p => p.hasNew && css`
    :after {
      content: '';
      display: block;
      background-color: ${p.theme.notifColor};
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: absolute;
      top: -3px;
      right: -2px;
    }
  `}
`;
