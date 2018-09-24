import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import BaseMenu from './components/Menu';
import BaseFlash from './containers/Flash';
import SiteFeedContainer from './containers/SiteFeed';
import VisiteFeed from './containers/VisiteFeed';
import PageFeed from './containers/PageFeed';
import BaseMessageForm from './containers/MessageForm';
import Breadcrumb from './components/Breadcrumb';
import BaseAuthForm from './containers/AuthForm';

export default class Body extends Component {
  render() {
    return <Fragment>
      <Flash/>

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

const Flash = styled(BaseFlash)`
  z-index: 6;
`;

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