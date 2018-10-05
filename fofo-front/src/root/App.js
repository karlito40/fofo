import React, { Component, Fragment } from 'react';
import { ThemeProvider } from "styled-components";
import { connect } from 'react-redux';
import { GlobalStyle, getTheme } from '../themes';
import { I18NProvider } from '../shared/i18n/react';
import Body from './Body'; 
import AppData from '../app';

class App extends Component {
  state = { translation: AppData.i18n.current() }

  selectLang = lang => {
    this.setState({ translation: AppData.i18n.select(lang).current() });
  }

  render() {
    const { app } = this.props;
    const { translation } = this.state;

    return (
      <I18NProvider value={translation}>
        <ThemeProvider theme={getTheme(app.theme)}>
          <Fragment>
            <GlobalStyle/>
            <Body/>
          </Fragment>
        </ThemeProvider>
      </I18NProvider>
    );
  }
}

const mapStateToProps = ({ app }) => ({ app });

export default connect(mapStateToProps)(App);
