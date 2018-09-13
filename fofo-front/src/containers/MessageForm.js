import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageForm from '../components/MessageForm';
import { actions as feedPage } from '../store/feed/page';
import { getState } from '../store';


class MessageFormContainer extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.lastSent !== prevProps.lastSent) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <MessageForm {...this.props}/>
  }
}

const mapStateToProps = ({feed}) => ({
  loading: feed.page.loadingForm,
  lastSent: feed.page.lastSent
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (message) => dispatch(feedPage.sendMessage(getState().app.href, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageFormContainer);