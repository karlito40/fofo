import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { MoreVert, Menu } from 'styled-icons/material';
import { Search, Menu as MenuFeather, MoreVertical } from 'styled-icons/feather';


window.addEventListener('message', (e) => {
  console.log('frame.app message received', e);
  const action = JSON.parse(e.data);
  if(action.type === 'INIT') {
    console.log('send message from app');
    chrome.runtime.sendMessage(action.data.extid, {from: 'popup', method:'ping'}, function(response) { // eslint-disable-line
    
    });
  }
});

const AppWrapper = styled.div`
  text-align: center;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled.img`
  animation: ${rotate360} infinite 1s linear;
  height: 80px;
  &:hover {
    animation: ${rotate360} infinite 1.5s linear;
  }
`;

const AppHeader = styled.div`
  background-color: #222;
  height: 12rem;
  padding: 1rem;
  color: white;
`;

const AppTitle = styled.h1`
  font-weight: 900;
`;

const AppIntro = styled.p`
  font-size: large;
  code {
    font-size: 1.3rem;
  }
`;

const DivImage = styled.div`
  height: 30px;
  width: 30px;
  background: url('./images/logo.svg');
  border: 1px solid black;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <AppHeader>
          <AppLogo src={`${process.env.PUBLIC_URL}images/logo.svg`} alt="logo" />
          <AppTitle>Welcome to React</AppTitle>
        </AppHeader>
        <AppIntro>
          Bootstrapped with <code>create-react-app</code>.
          <MoreVert size="25"/>
          <MoreVertical size="25"/>
          <Menu size="25"/>
          <MenuFeather size="25"/>
          <Search size="25"/>
        </AppIntro>
        <DivImage/>
      </AppWrapper>
    );
  }
}

export default App;
