import React, { Component, Fragment } from 'react';
import { ThemeProvider } from "styled-components";
import { connect } from 'react-redux';
import { GlobalStyle, getTheme } from './themes';
import Body from './Body';

class App extends Component {
  render() {
    const { app } = this.props;

    return (
      <ThemeProvider theme={getTheme(app.theme)}>
        <Fragment>
          <GlobalStyle/>
          <Body/>
        </Fragment>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ app }) => ({ app });

export default connect(mapStateToProps)(App);
