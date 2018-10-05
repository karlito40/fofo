import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Home as HomeIcon } from 'styled-icons/material/Home';
import { Settings as SettingsIcon } from 'styled-icons/material/Settings';
import { MoreVert as MoreVertIcon } from 'styled-icons/material/MoreVert';
// import { Search as SearchIcon } from 'styled-icons/feather/Search';
import { User as UserIcon } from 'styled-icons/fa-solid/User';
import Hint from '../shared/components/Hint';
import Avatar from './Avatar';

export default class extends Component {
  render() {
    const { className, user } = this.props;

    return <Wrapper className={className}>
      <Sites>
        <Logo>Fofo</Logo>
        {this.props.children}
      </Sites>
      <Interaction>
        {user.isLogged && (
          <IconContainer>
            <Hint>Profile</Hint>
            <Avatar user={user} size={20}/>
          </IconContainer>
        )}
        
        <IconContainer onClick={this.props.onSettingsClick}>
          <Hint>Settings</Hint>
          <FillIcon as={SettingsIcon} size={20}/>
        </IconContainer>
      </Interaction>
    </Wrapper>
  }
}

const Logo = styled.div`
  ${p => p.theme.horizontal && css`
    display: none;
  `}

  ${p => p.theme.vertical && css`
    font-size: 16px;
    color: ${p.theme.menuColor};
    margin-left: 10px;
  `}
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;

  ${p => p.theme.vertical && css`
    background-color: ${p.theme.menuBgColor};
    width: 100%;
    height: ${p.theme.menuHeight};
    padding: 0 5px;
  `}

  ${p => p.theme.horizontal && css`
    background-color: ${p.theme.secondaryBgColor};
    width: ${p.theme.menuWidth};
    height: auto;
    bottom: 0;
    box-shadow: ${p.theme.primaryBoxShadow};
    flex-direction: column;
    align-items: center;
    padding: 10px 0 0 0;
  `}
`;

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 7px 0;
  cursor: pointer;
`;

const Icon = styled.div`
  fill: ${p => p.theme.menuColor};
  stroke: ${p => p.theme.menuBgColor};
  color: ${p => p.theme.menuColor};
`;

const StrokeIcon = styled(Icon)`
  fill: ${p => p.theme.menuBgColor};
  stroke: ${p => p.theme.menuColor};
`;

const FillIcon = styled(Icon)`
  fill: ${p => p.theme.menuColor};
  stroke: ${p => p.theme.menuBgColor};
`;

const AutoFlexbox = styled.div`
  display: flex;
  align-items: center;
  ${p => p.theme.horizontal && css`
    flex-direction: column;
  `}
`;

const Interaction = styled(AutoFlexbox)`
  ${p => p.theme.horizontal && css`
    width: 100%;
    padding-bottom: 5px;
  `}
`;

const Sites = styled(AutoFlexbox)`
  position: relative;
  flex: 1;

  ${p => p.theme.horizontal && css`
    overflow: scroll;
    width: 100%;

    :after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      height: 10px;
      pointer-events: none;
      background: linear-gradient(to top, rgba(255, 255, 255) 0%, transparent 100%);
      width: 100%;
    }
    
  `}
`;
