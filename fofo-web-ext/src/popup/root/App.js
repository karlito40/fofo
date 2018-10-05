import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from '../themes';
import { I18NProvider } from '../../shared/i18n/react';
import AppData from '../app';
import PopupExtension from '../../shared/components/PopupExtension';

export default class App extends Component {
  state = { translation: AppData.i18n.current() }

  render() {
    const { translation } = this.state;
    
    return (
      <I18NProvider value={translation}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyle/>
            <PopupExtension/>
          </Fragment>
        </ThemeProvider>
      </I18NProvider>
    );
  }
}
