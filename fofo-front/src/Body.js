import React, { Component, Fragment } from 'react';
import styled, { css } from "styled-components";
import MenuContainer from './containers/Menu';
import SiteFeedContainer from './containers/SiteFeed';
import PageFeedContainer from './containers/PageFeed';
import BaseMessageForm from './components/MessageForm';

export default class extends Component {
  render() {
    return <Fragment>
      <Menu/>
      <SiteFeed/>
      <PageFeed/>
      <MessageForm/>
    </Fragment> 
  }
}

const PageFeed = styled(PageFeedContainer)`
  ${p => p.theme.horizontal && css`
    margin-left: ${p.theme.panelWidth};
  `}
`;

const Menu = styled(MenuContainer)`
  z-index: 4;
`;

const SiteFeed = styled(SiteFeedContainer)`
  z-index: 3;
`;

const MessageForm = styled(BaseMessageForm)`
  z-index: 2;
`;
