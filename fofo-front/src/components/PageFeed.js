import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import BaseComment from './Comment';
import BaseLoader from './Loader';
import InfiniteScroll from 'react-infinite-scroller';
import Box from './Box';
import { appear as AppearAnimation } from './animations/comment';

export default class extends Component {
  componentDidMount() {
    this.hasBeenRender = true;
  }
  
  render() {
    const { className, comments, hasMore, loading, loadMore } = this.props;

    return <Wrapper className={className}>
      {!hasMore && !comments.length && 
        <EmptyThread>Be the first to comment this thread.</EmptyThread>
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
          <Comment 
            key={comment.id} 
            comment={comment}
            onLike={this.props.onLike}
            onEdit={this.props.onEdit}
          />
        )}
      </InfiniteScroll>

      {loading && (
        <Layer height={300} position={comments.length ? 'relative' : 'static'}>
          <Loader center/>
        </Layer>
      )}
    </Wrapper>
  }
}

const Wrapper = styled.div`
  padding-top: 1px;
  min-height: 100vh;
  padding-bottom: ${p => p.theme.messageFormHeight};
`;

const Comment = styled(BaseComment)`
  ${p => p.theme.vertical && css`
    :first-child {
      margin-top: 0px;
    }
  `}
`;

const Layer = styled.div`
  height: ${p => p.height}px;
  position: ${p => p.position};
`;


const Loader = styled(BaseLoader)`
  ${p => !p.center && css`
    left: 50%;
    margin-left: -20px;
    margin-bottom: 30px;
    margin-top: 15px;
  `}
`;

const EmptyThread = styled(Box)`
  margin: 30px;
  padding: 30px;
  ${AppearAnimation()}
`;

