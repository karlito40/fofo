import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Page from './Page';

export default class extends Component {
  render() {
    const { pages, className } = this.props;

    return <Wrapper className={className}>
      { pages.map(page => <Page key={page.id} page={page}/>) }
    </Wrapper>
  }
}

const Wrapper = styled.div`
  background-color: ${p => p.theme.secondaryBgColor};
  overflow: scroll;

  ${p => p.theme.vertical && css`
    display: none;
  `}

  ${p => p.theme.horizontal && css`
    position: fixed;
    left: ${p.theme.siteFeedLeft};
    width: ${p.theme.siteFeedWidth}; 
    top: 0;
    bottom: 0;
    box-shadow: ${p.theme.primaryBoxShadow};
  `}
`;

