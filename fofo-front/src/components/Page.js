import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Box from './styled/Box';

export default class extends Component {
  handleClick = (page) => {
    this.props.onClick(page);
  }

  render() {
    const { page, className} = this.props;

    return (
      <BoxStyled className={className} onClick={this.handleClick.bind(this, page)}>
        <Link highlight={page.newMessages}>{decodeURIComponent(page.uri)}</Link>
        <Title>{page.title}</Title>
      </BoxStyled>
    );
  }
}

const BoxStyled = styled(Box)`
  cursor: pointer;
`;

const Link = styled.div`
  color: ${p => p.highlight ? p.theme.highlightColor : p.theme.strongColor};
  margin-bottom: 10px;

  ${BoxStyled}:hover & {
    color: ${p => p.theme.highlightColor};
  }
`;

const Title = styled.div`
  font-style: italic;
`;

