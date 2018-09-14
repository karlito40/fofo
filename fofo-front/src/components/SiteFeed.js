import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Page from './Page';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroller';

export default class extends Component {
  render() {
    const { pages, className } = this.props;

    return <Wrapper className={className}>
      <InfiniteScroll
        pageStart={0}
        loadMore={this.props.loadMore}
        hasMore={this.props.hasMore}
        loader={<LoaderStyled key={0}/>}
        useWindow={false}
      >
        { pages && pages.map(page => <Page key={page.id} page={page}/>) }
      </InfiniteScroll>
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

const LoaderStyled = styled(Loader)`
  left: 50%;
  margin-left: -20px;
  margin-top: 30px;
`;
