import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Comment from './Comment';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroller';
import Box from './styled/Box';

export default class extends Component {
  componentDidMount() {
    this.hasBeenRender = true;
  }
  
  render() {
    const { className, comments, hasMore, loading, loadMore } = this.props;

    return <Wrapper className={className}>
      {!hasMore && !comments.length && 
        <EmptyThred>Be the first to comment this thread.</EmptyThred>
      }

      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        // loading est important pour éviter d'envoyer des requêtes lorsqu'une est déjà présente
        hasMore={!loading && hasMore} 
        // On préfère gérer le loader nous même
        loader={null}
        useWindow={true}
      >
        {comments.map(comment => 
          <CommentStyled 
            key={comment.id} 
            // {...comment}
            comment={comment}
            onLike={this.props.onLike}
            onEdit={this.props.onEdit}
          />)}
      </InfiniteScroll>

      {loading && <LoaderStyled center={!comments.length}/>}
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

const EmptyThred = styled(Box)`
  margin: 30px;
  padding: 30px;
`;

