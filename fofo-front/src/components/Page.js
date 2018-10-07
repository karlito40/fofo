import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import BaseBox from './Box';
import * as Uri from '../utils/Uri';

export default class extends Component {
  handleClick = (page) => {
    this.props.onClick(page);
  }

  render() {
    const { page, className} = this.props;

    return (
      <Box className={className} onClick={this.handleClick.bind(this, page)} hasNew={page.has_new_comment}>
        <Link active={page.active}>{getLinkName(page)}</Link>
        <Title>{getTitle(page)}</Title>
      </Box>
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


const Box = styled(BaseBox)`
  cursor: pointer;
  position: relative;
  transition: 0.2s transform, 0.2s box-shadow 0.1s;

  &:hover {
    transform: translateY(-7px) translateX(4px);
    box-shadow: -4px 20px 30px -12px rgba(211,215,221,0.6);
  }

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

`;

const Title = styled.div`
  font-style: italic;
`;

