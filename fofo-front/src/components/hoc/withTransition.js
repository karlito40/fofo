import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { getDisplayName } from './utils';

export default function withTransition(options = {}) {

  return function wrap(WrappedComponent) {
    class WithTransition extends Component {
      child = React.createRef();

      animate = (node, done) => {
        this.ensureTimeline();
        
        if(this.props.show) {
          this.tl
            .play()
            .eventCallback('onComplete', done);
        } else {
          this.tl
            .reverse()
            .eventCallback('onReverseComplete', done);
        }
      }

      clear = () => {
        this.tl = null
      }

      ensureTimeline() {
        if(this.tl) {
          return this.tl;
        }

        const timelineCreatorName = options.getTimeline || 'getTimeline';
        console.log('this.child', this.child);
        if(!this.child.current[timelineCreatorName]) {
          throw new Error(`${getDisplayName(WrappedComponent)} need to be defined with a timeline creator. 
            getTimeline() is used by default.`)
        }

        this.tl = this.child.current[timelineCreatorName]();
        return this.tl;
      }

      componentWillUnmount() {
        this.clear();
      }

      render() {
        const { show } = this.props;

        return (
          <Transition
            mountOnEnter
            unmountOnExit
            in={show}
            onExited={this.clear}
            addEndListener={this.animate}
          > 
            <WrappedComponent ref={this.child} {...this.props} />
          </Transition>
        );
      }

    }
  
    WithTransition.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
    return WithTransition;
  }
}
