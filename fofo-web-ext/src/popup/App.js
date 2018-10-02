import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from './themes';
import Body from './Body';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle/>
          <Body/>
        </Fragment>
      </ThemeProvider>
    );
  }
}
