import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import BaseMenu from '../containers/Menu';
import BaseFlash from '../containers/Flash';
import SiteFeedContainer from '../containers/SiteFeed';
import VisiteFeed from '../containers/VisiteFeed';
import PageFeed from '../containers/PageFeed';
import BaseMessageForm from '../containers/MessageForm';
import Breadcrumb from '../components/Breadcrumb'; 
import BaseAuthForm from '../containers/AuthForm';
import BaseSettings from '../components/Settings';

export default class Body extends Component {
  state = { showSettings: false }

  toggleSettings = () => {
    this.setState({showSettings: !this.state.showSettings});
  }

  render() {
    const { showSettings } = this.state;

    return <Fragment>
      
      {showSettings && <Settings/>}

      <Flash/>

      <Menu onSettingsClick={this.toggleSettings}>
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

const Settings = styled(BaseSettings)`
  z-index: 8;
`;

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
`;