import React, { Component, Fragment } from 'react';
import styled from "styled-components";
import Menu from './containers/Menu';
import SiteFeed from './containers/SiteFeed';
import PageFeed from './containers/PageFeed';

export default class extends Component {
  render() {
    return <Fragment>
      <Menu/>
      <SiteFeed/>
      <PageFeed/>
    </Fragment> 
  }
}