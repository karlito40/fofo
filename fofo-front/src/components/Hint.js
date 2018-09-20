import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

export default class extends Component {
  wrapperRef = React.createRef();
  hintRef = React.createRef();
  
  state = { active: false };

  constructor(props) {
    super(props);
    
    if(typeof document !== "undefined") {
      this.root = document.getElementById('hint-root')
      if(!this.root) {
        this.root = document.createElement('div');
        this.root.setAttribute('id', 'hint-root');
        document.body.appendChild(this.root);
      }
    }
  } 

  handleMouseEnter = (e) => {
    this.setState({active: true});
  }
  
  handleMouseLeave = (e) => {
    this.setState({active: false});
  }

  handleMouseMove = (e) => {
    if(!this.wrapperRef.current) {
      return;
    }

    const wrapperRect = this.wrapperRef.current.getBoundingClientRect();
    const middle = ~~(wrapperRect.height/2);
    this.wrapperRef.current.style.left = `${e.pageX + 13}px`;
    this.wrapperRef.current.style.top = `${e.pageY - middle}px`;
  }

  componentDidMount() {
    this.hintRef.current.parentElement.addEventListener('mouseenter', this.handleMouseEnter);
    this.hintRef.current.parentElement.addEventListener('mousemove', this.handleMouseMove);
    this.hintRef.current.parentElement.addEventListener('mouseleave', this.handleMouseLeave);
  }

  componentWillUnmount() {
    this.hintRef.current.parentElement.removeEventListener('mouseenter', this.handleMouseEnter);
    this.hintRef.current.parentElement.removeEventListener('mousemove', this.handleMouseMove);
    this.hintRef.current.parentElement.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  renderHint() {
    return <React.Fragment>
        {this.state.active && 
          <Wrapper ref={this.wrapperRef}>
            {this.props.children}
          </Wrapper>
        }
      </React.Fragment>
  }

  render() {
    return <React.Fragment>
      <HintRef ref={this.hintRef}/>
      {ReactDOM.createPortal(this.renderHint(), this.root)}
    </React.Fragment>
  }

}

const HintRef = styled.div`
  position: fixed;
  left: -9999px;
  top: -9999px;
  pointer-events: none;
  width: 0 !important;
  height: 0 !important;
`;

const Wrapper = styled.div`
  background-color: black;
  color: white;
  position: absolute;
  pointer-events: none;
  z-index: 9999;
  padding: 3px 14px;
  border-radius: 25px;
  
  /* opacity: 0;

  &.active {
    opacity: 1;
  } */

`;

