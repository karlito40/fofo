import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

export default class extends Component {
  state = {show: false};

  showEndAnimation = () => {
    this.clearTimeout();
    this.setState({show: false});
  }

  handleCompleteAnimation = () => {
    this.props.onComplete();
  }

  registerTimeout = () => {
    this.timeout = setTimeout(this.showEndAnimation, this.props.message.timeout);
  }

  showMessage() {
    const { message } = this.props;
    if(!message) {
      return;
    }

    this.setState({show: true});
  }

  clearTimeout() {
    if(this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  componentDidMount() {
    this.showMessage();
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.message !== this.props.message) {
      this.showMessage();
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }
  
  render() {
    const { className, message } = this.props;

    return <Wrapper className={className}>
      {message && 
        <CSSTransition
          in={this.state.show}
          appear={true}
          timeout={{enter: 1000, exit: 500}}
          onEntered={this.registerTimeout}
          onExited={this.handleCompleteAnimation}
          classNames="message"
        >
          <Message onClick={this.showEndAnimation} type={message.type}>
            <div className="content">
              {message.text}
            </div>
          </Message> 
        </CSSTransition>
      }
    </Wrapper>
  }
}

const Wrapper = styled.div`
  position: fixed;
  right: 30px;
  top: 30px;
  margin-left: 30px;
`;

const Message = styled.div`
  background-color: black;
  color: white;
  padding: 3px 14px;
  border-radius: 25px;
  ${p => p.type === 'error' && css`
    background-color: ${p.theme.errorColor};
  `}

  &.message-appear,
    &.message-enter {
      & { transform: translateX(20px) }
      .content { opacity: 0; }
    }

    &.message-appear-active,
    &.message-enter-active {
      & { transform: translateX(0px); transition: transform 200ms; }
      .content { opacity: 1; transition: opacity 1000ms; }
    }

    &.message-exit {
      & { transform: translateX(0px); opacity: 1; }
      .content { opacity: 1; }
    }

    &.message-exit-active {
      & { 
        transform: translateX(20px); 
        opacity: 0; 
        transition: 
          transform 200ms ease-out 300ms,
          opacity 200ms 300ms;
      }
      .content { opacity: 0; transition: opacity 350ms;}
    }
`;
