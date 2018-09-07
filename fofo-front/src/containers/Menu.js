import React, { Component } from 'react';
import Menu from '../components/Menu';

const sites = [
  {name: 'medium.com', ico: '/images/medium-favicon.ico'},
  {name: 'medium.com', ico: '/images/medium-favicon.ico'},
  {name: 'medium.com', ico: '/images/medium-favicon.ico'},
];

export default (props) => <Menu {...props} sites={sites}/>