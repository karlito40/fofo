import React, { Component } from 'react';
import PageFeed from '../components/PageFeed';
import { connect } from 'react-redux';
import { actions as pageActions } from '../store/feed/page';

class PageFeedContainer extends Component {
  componentDidMount() {
    this.props.loadFeed(this.props.href);
  }

  componentDidUpdate(prevProps) {
    if (this.props.href !== prevProps.href) {
      this.props.loadFeed(this.props.href);
    }
  }

  render() {
    const { feed } = this.props;
    return <PageFeed {...this.props} {...feed}/>
  }
}

const mapStateToProps = ({ feed, app }) => ({
  href: app.href,
  feed: feed.page,
});

const mapDispatchToProps = (dispatch) => ({
  loadFeed: (href) => dispatch(pageActions.fetch(href)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageFeedContainer);
