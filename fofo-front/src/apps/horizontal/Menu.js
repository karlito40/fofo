import React, { Component } from 'react';
import styled from "styled-components";
import { Home as HomeIcon } from 'styled-icons/material';

const Image = styled.img`
  width: 15px;
  height: 15px;
`;

export default class extends Component {
  render() {
    const { sites } = this.props;

    return <div>
      <HomeIcon size={20}/>
      {sites.map((site, i) => <Image key={i} src={site.ico} alt={site.name}/>)}
    </div>
  }
}