import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { actions as meActions } from './store/app/me';
import MenuContainer from './containers/Menu';
import SiteFeedContainer from './containers/SiteFeed';
import WorldFeed from './containers/WorldFeed';
import PageFeedContainer from './containers/PageFeed';
import BaseMessageForm from './components/MessageForm';
import Breadcrumb from './components/Breadcrumb';

export default class Body extends Component {
  render() {
    return <Fragment>
      <Menu>
        <WorldFeed/> 
      </Menu>
      <SiteFeed/>
      <MessageForm/>
      <Content>
        <Breadcrumb/>
        <PageFeed/>
      </Content>
    </Fragment> 
  }
}

const PageFeed = styled(PageFeedContainer)`
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

const Content = styled.div`
  position: relative;
  background-color: ${p => p.theme.primaryBgColor};

  ${p => p.theme.horizontal && css`
    margin-left: ${p.theme.panelWidth};
  `}

  ${p => p.theme.vertical && css`
    padding-top: ${p.theme.contentWrapperTop};
  `}

  
  
`