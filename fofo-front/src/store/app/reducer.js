import User from './user';

export default {
  _dependencies: {
    user: User,
  },
  _state: {
    id: 'x',
    fakeProps: 'hello',
  },
  self: {
    // parent: app,
    setPost(state, data) {
      // console.log('this', this);
    },
    // handle APP.HELLO_WORLD
    helloWorld(state, data) {
      return {...state, ...data};
    },
    // handle APP.OTHER_EVENT
    otherEvent(state, data) {
      console.log('otherEvent', data);
      return {...state, ...data};
    },
  },
  toto: {
    // handle TOTO.TEST
    test(state, data) {
      return {...state, ...data};
    },
  },
  global: {
    // handle SIMPLE_TEST
    simpleTest(state, data) {
      return {...state, ...data};
    }  
  }
  
};

