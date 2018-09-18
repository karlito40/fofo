import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Home as HomeIcon } from 'styled-icons/material/Home';
import { MoreVert as MoreVertIcon } from 'styled-icons/material/MoreVert';
import { Search as SearchIcon } from 'styled-icons/feather/Search';

export default class extends Component {
  render() {
    const { className } = this.props;

    return <Wrapper className={className}>
      <Sites>
        <Logo>Fofo</Logo>
        {this.props.children}
      </Sites>
      <Interaction>
        <StrokeIcon as={SearchIcon}/>
        <FillIcon as={MoreVertIcon}/>
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
    padding: 10px 0 5px 0;
  `}
`;

const Icon = styled.div`
  fill: ${p => p.theme.menuColor};
  stroke: ${p => p.theme.menuBgColor};
  width: 20px;
  height: 20px;
  cursor: pointer;

  ${p => p.theme.horizontal && css`
    margin-bottom: 10px;
  `}

  ${p => p.theme.vertical && css`
    ${p.hideOnVertical && css`
      display: none;
    `}
    fill: white;
    margin-left: 5px;
  `}
`;

const StrokeIcon = styled(Icon)`
  fill: ${p => p.theme.menuBgColor};
  stroke: ${p => p.theme.menuColor};

  :hover {
    ${p => p.theme.horizontal && css`
      stroke: ${p => p.theme.highlightColor};
    `}
  }
`;

const FillIcon = styled(Icon)`
  fill: ${p => p.theme.menuColor};
  stroke: ${p => p.theme.menuBgColor};

  :hover {
    ${p => p.theme.horizontal && css`
      fill: ${p => p.theme.highlightColor};
    `}
  }
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
    margin-top: 10px;
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
