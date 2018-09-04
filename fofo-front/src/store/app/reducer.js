// default state
export default {
  default: {
    id: 'x',
    fakeProps: 'hello'  
  },
  module: {
    // handle APP.HELLO_WORLD
    helloWorld(state, data) {
      return {...state, ...data};
    },
    // handle APP.OTHER_EVENT
    otherEvent(state, data) {
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

