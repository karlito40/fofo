import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import BaseMenu from './components/Menu';
import SiteFeedContainer from './containers/SiteFeed';
import WorldFeed from './containers/WorldFeed';
import VisiteFeed from './containers/VisiteFeed';
import PageFeed from './containers/PageFeed';
import BaseMessageForm from './containers/MessageForm';
import Breadcrumb from './components/Breadcrumb';
import BaseAuthForm from './components/AuthForm';

export default class Body extends Component {
  render() {
    return <Fragment>
      <Menu>
        <VisiteFeed/>
      </Menu>
      
      <SiteFeed/>
      
      <Content>
        <Breadcrumb/>
        <PageFeed/>
      </Content>

      <MessageForm>
        <AuthForm/>  
      </MessageForm>
      
    </Fragment> 
  }
}

const AuthForm = styled(BaseAuthForm)`
  z-index: 5;
`;

const Menu = styled(BaseMenu)`
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