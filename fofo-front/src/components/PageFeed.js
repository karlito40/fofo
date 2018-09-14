import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Comment from './Comment';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroller';

export default class extends Component {
  componentDidMount() {
    this.hasBeenRender = true;
  }
  
  render() {
    const { className, comments } = this.props;

    return <Wrapper className={className}>
      <InfiniteScroll
        pageStart={0}
        loadMore={this.props.loadMore}
        hasMore={this.props.hasMore}
        loader={<LoaderStyled center={!this.hasBeenRender} key={0}/>}
        useWindow={true}
      >
        {comments.map(comment => <CommentStyled key={comment.id} comment={comment}/>)}
      </InfiniteScroll>
    </Wrapper>
  }
}

const Wrapper = styled.div`
  padding-top: 1px;
  min-height: 100vh;
  padding-bottom: ${p => p.theme.messageFormHeight};
`;

const CommentStyled = styled(Comment)`
  ${p => p.theme.vertical && css`
    :first-child {
      margin-top: 0px;
    }
  `}
`;

const LoaderStyled = styled(Loader)`
  ${p => !p.center && css`
    left: 50%;
    margin-left: -20px;
    margin-bottom: 30px;
    margin-top: 15px;
  `}
`;

