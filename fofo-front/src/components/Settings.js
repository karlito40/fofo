import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PopupExtension from '../shared/components/PopupExtension';

export default class extends Component {
  render() {
    const { className } = this.props;

    return <Wrapper className={className}>
        <PopupExtension/>
      </Wrapper>
  }
}

const Wrapper = styled.div`
  background-color: ${p => p.theme.secondaryBgColor};
  position: fixed;
  bottom: 10px;
  left: 40px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: ${p => p.theme.primaryBoxShadow};
`;