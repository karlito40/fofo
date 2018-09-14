import React, { Component } from 'react';
import { connect } from 'react-redux';
import SiteFeed from '../components/SiteFeed';
import { actions as siteActions } from '../store/feed/site';
import { getState } from '../store';
import config from '../config';

class SiteFeedContainer extends Component {
  async refresh() {
    this.refreshTimeout = setTimeout(async () => {
      await this.props.loadRefresh();
      this.refresh();
    }, config.siteFeedRefreshTimer);
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTimeout);
  }


  render() {
    return <SiteFeed {...this.props}/>
  }
}

const mapStateToProps = ({ feed, app }) => ({
  key: app.domain,
  domain: app.domain,
  pages: feed.site.pages,
  hasMore: feed.site.hasMore,
});

const mapDispatchToProps = (dispatch) => ({
  loadRefresh: () => dispatch(siteActions.refresh(
    getState('app.domain'),
    getState('feed.site.currentSizeFetch'), 
  )),
  loadMore: (page) => dispatch(siteActions.next(
    getState('app.domain'), 
    page
  ))
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteFeedContainer);
