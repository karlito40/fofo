import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

export default class extends Component {
  wrapperRef = React.createRef();
  
  state = { active: true };

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
    this.wrapperRef.current.style.left = `${e.clientX + 13}px`;
    this.wrapperRef.current.style.top = `${e.clientY - middle}px`;
  }

  renderHint() {
    return <React.Fragment>
      {this.state.active && 
        <Wrapper ref={this.wrapperRef}>
          {this.props.content}
        </Wrapper>
      }
    </React.Fragment>
  }

  render() {
    return <React.Fragment>
      {this._createPortal()}
      {this._childrenWithRefs()}
    </React.Fragment>;
  }

  _createPortal() {
    return ReactDOM.createPortal(this.renderHint(), this.root);
  }

  _childrenWithRefs() {
    const overrideEvents = ['MouseMove', 'MouseEnter', 'MouseLeave'];
    return React.Children.map(this.props.children, (child, index) => {
      const override = {};
      for(let eventName of overrideEvents) {
        const onEventName = `on${eventName}`;
        override[onEventName] = (e) => {
          this[`handle${eventName}`](e);
          if (typeof child[onEventName] === 'function') {
            child[onEventName](e);
          }
        }
      }
      return React.cloneElement(child, override);
    });
  }
}

const Wrapper = styled.div`
  background-color: black;
  color: white;
  position: absolute;
  pointer-events: none;
  z-index: 9999;
  padding: 3px 14px;
  border-radius: 25px;
`;

