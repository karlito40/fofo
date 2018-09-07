import React, { Component } from 'react';
import styled from "styled-components";
import { Home as HomeIcon, MoreVert as MoreVertIcon } from 'styled-icons/material';
import { Search as SearchIcon } from 'styled-icons/feather';

export default class extends Component {
  render() {
    const { sites, className } = this.props;

    return <Wrapper className={className}>
      <AutoFlexbox>
        <Logo>Fofo</Logo>
        <Icon as={HomeIcon} hideOnVertical/>
        {sites.map((site, i) => <Image key={i} src={site.ico} alt={site.name} hideOnVertical/>)}
      </AutoFlexbox>
      <Extras>
        <StrokeIcon as={SearchIcon}/>
        <FillIcon as={MoreVertIcon}/>
      </Extras>
    </Wrapper>
  }
}

const Logo = styled.div`
  ${p => p.theme.horizontal && `
    display: none;
  `}

  ${p => p.theme.vertical && `
    font-size: 16px;
    color: ${p.theme.menuColor};
    margin-left: 10px;
  `}
`;
const Image = styled.img`
  width: 15px;
  height: 15px;
  
  ${p => p.theme.horizontal && `
    margin-bottom: 15px;
  `}

  ${p => p.theme.vertical && `
    margin-left: 15px;
    ${p.hideOnVertical && `
      display: none;
    `}
  `}
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;

  ${p => p.theme.vertical && `
    background-color: ${p.theme.menuBgColor};
    width: 100%;
    height: 40px;
    padding: 0 5px;
  `}

  ${p => p.theme.horizontal && `
    background-color: ${p.theme.secondaryBgColor};
    width: 40px;
    height: auto;
    bottom: 0;
    box-shadow: 0px 10px 30px 0px rgba(211, 215, 221, 0.4);
    flex-direction: column;
    align-items: center;
    padding: 10px 0 5px 0;
  `}
`;

const Icon = styled.div`
  fill: ${p => p.theme.menuColor};
  stroke: ${p => p.theme.menuBgColor}
  width: 20px;
  height: 20px;
  
  ${p => p.theme.horizontal && `
    margin-bottom: 10px;
  `}

  ${p => p.theme.vertical && `
    ${p.hideOnVertical && `
      display: none;
    `}
    fill: white;
    margin-left: 5px;
  `}
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
  ${p => p.theme.horizontal && `
    flex-direction: column;
  `}
`;

const Extras = styled(AutoFlexbox)`
  flex: 1;
  justify-content: flex-end;
`;
