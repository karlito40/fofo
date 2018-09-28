import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from './themes';

export default class App extends Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle/>
          <Body>Lalala</Body>
        </Fragment>
      </ThemeProvider>
    );
  }
}

const Body = styled.div`
  background-color: grey;
  width: 400px;
`;