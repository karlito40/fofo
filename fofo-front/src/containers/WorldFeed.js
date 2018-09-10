import React, { Component } from 'react';
import WorldFeed from '../components/WorldFeed';
import { connect } from 'react-redux';
import { actions as worldActions } from '../store/feed/world';

class WorldFeedContainer extends Component {
  componentDidMount() {
    this.props.loadFeed();
  }

  render() {
    const { feed } = this.props;
    return <WorldFeed {...this.props} {...feed}/>
  }
}

const mapStateToProps = ({ feed, app }) => ({
  feed: feed.world,
});

const mapDispatchToProps = (dispatch) => ({
  loadFeed: (href) => dispatch(worldActions.fetch(href)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorldFeedContainer);
 