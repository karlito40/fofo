import React, { Component } from 'react';
import PageFeed from '../components/PageFeed';
import { connect } from 'react-redux';
import { actions as pageActions } from '../store/feed/page';
import { getState } from '../store';

class PageFeedContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.key !== prevProps.key) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <PageFeed {...this.props}/>
  }
}

const mapStateToProps = ({ feed, app }) => ({
  key: app.href,  // Key is important to force the reinitialisation of InfiniteScroll ( page never restart otherwise )
  hasMore: feed.page.hasMore,
  comments: feed.page.comments,
});

const mapDispatchToProps = (dispatch) => ({
  loadMore: (page) => {
    return dispatch(pageActions.next(
        getState('app.href'), 
        getState('feed.page.cursorNext')
      )
    )
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageFeed);
