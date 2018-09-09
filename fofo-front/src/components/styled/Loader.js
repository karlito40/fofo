import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class Loader extends Component {
  render() {
    console.log('center', this.props.center);
    return (
      <div className={this.props.className}>
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    );
  }
}

const defaultSize = 40;
const getSize = p => p.size || defaultSize;

export default styled(Loader)`
  width: ${getSize}px;
  height: ${getSize}px;
  position: relative;
  ${p => p.center && css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -${getSize(p)/2}px;
    margin-top: -${getSize(p)}px;
  `}
  

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #333;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    
    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% { 
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% { 
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
`;

