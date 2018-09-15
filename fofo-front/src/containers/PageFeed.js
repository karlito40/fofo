import React, { Component } from 'react';
import PageFeed from '../components/PageFeed';
import { connect } from 'react-redux';
import { actions as pageActions } from '../store/feed/page';
import { getState } from '../store';
import config from '../config';

class PageFeedContainer extends Component {
  async refresh() {
    this.refreshTimeout = setTimeout(async () => {
      await this.props.loadRefresh();
      this.refresh();
    }, config.pageFeedRefreshTimer);
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTimeout);
  }

  componentDidUpdate(prevProps) {
    if (this.props.lastCommentSent !== prevProps.lastCommentSent) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <PageFeed {...this.props}/>
  }
}

const mapStateToProps = ({ feed, app, form }) => ({
  key: app.href,  // Key is important to force the reinitialisation of InfiniteScroll ( page never restart otherwise )
  hasMore: feed.page.hasMore,
  comments: feed.page.comments,
  lastCommentSent: form.comment.lastSent,
});

const mapDispatchToProps = (dispatch) => ({
  loadRefresh: () => dispatch(pageActions.refresh(
    getState('app.href'),
    getState('feed.page.firstCursor'), 
  )),
  loadMore: (page) => dispatch(pageActions.next(
    getState('app.href'), 
    getState('feed.page.nextCursor')
  )),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageFeedContainer);
