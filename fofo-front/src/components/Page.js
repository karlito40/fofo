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
      <BoxStyled className={className} onClick={this.handleClick.bind(this, page)}>
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
`;

const Link = styled.div`
  color: ${p => (p.highlight || p.active) ? p.theme.highlightColor : p.theme.strongColor};
  margin-bottom: 10px;

  ${BoxStyled}:hover & {
    color: ${p => p.theme.highlightColor};
  }
`;

const Title = styled.div`
  font-style: italic;
`;

