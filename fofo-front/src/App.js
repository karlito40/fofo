import React, { Component, Fragment } from 'react';
import GlobalStyle from './themes/globalStyle';
import { connect } from 'react-redux';


class App extends Component {
  render() {
    const { app } = this.props;

    return (
      <Fragment>
        <GlobalStyle/>
        <app.component/>
      </Fragment>
    );
  }
}

const mapStateToProps = ( { app }) => ({ app });

export default connect(mapStateToProps)(App);
