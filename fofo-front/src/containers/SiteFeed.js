import React, { Component } from 'react';
import { connect } from 'react-redux';
import SiteFeed from '../components/SiteFeed';

import { actions as siteActions } from '../store/feed/site';

class SiteFeedContainer extends Component {
  componentDidMount() {
    this.props.loadFeed(this.props.domain);
  }

  componentDidUpdate(prevProps) {
    if (this.props.domain !== prevProps.domain) {
      this.props.loadFeed(this.props.domain);
    }
  }

  render() {
    const { feed } = this.props;
    return <SiteFeed {...this.props} {...feed}/>
  }
}

const mapStateToProps = ({ feed, app }) => ({
  domain: app.domain,
  feed: feed.site,
});

const mapDispatchToProps = (dispatch) => ({
  loadFeed: domain => dispatch(siteActions.fetch(domain)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteFeedContainer);
