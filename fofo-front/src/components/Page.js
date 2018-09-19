import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Box from './styled/Box';
import * as Uri from '../lib/Uri';

export default class extends Component {
  handleClick = (page) => {
    this.props.onClick(page);
  }

  render() {
    const { page, className} = this.props;

    return (
      <BoxStyled className={className} onClick={this.handleClick.bind(this, page)} hasNew={true}>
        <Link active={page.active}>{getLinkName(page)}</Link>
        <Title>{getTitle(page)}</Title>
      </BoxStyled>
    );
  }
}

function getLinkName(page) {
  if(!page.uri) {
    return 'Accueil';
  }
  const channel = Uri.getChannel(page.uri);
  if(channel) {
    return '#' + channel;
  }

  return decodeURIComponent(page.uri);
}

function getTitle(page) {
  const channel = Uri.getChannel(page.uri);
  if(page.isPlaceholder && channel) {
    return 'Channel ' + channel;
  }

  return page.title;
}

const BoxStyled = styled(Box)`
  cursor: pointer;
  position: relative;
  /* overflow: hidden; */

  ${p => p.hasNew && css`
    :after {
      content: '';
      display: block;
      background-color: ${p.theme.notifColor};
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  `}
`;

const Link = styled.div`
  display: inline-block;
  color: ${p => (p.highlight) ? p.theme.highlightColor : p.theme.strongColor};
  margin-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  border-bottom: 1px solid transparent;

  ${p => p.active && css`
    border-bottom: 1px solid ${p.theme.strongColor};
  `}

  ${BoxStyled}:hover & {
    color: ${p => !p.active && p.theme.highlightColor};
  }
`;

const Title = styled.div`
  font-style: italic;
`;

