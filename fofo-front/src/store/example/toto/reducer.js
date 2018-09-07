export default {
  _state: {
    id: '1-toto',
  },
  self: {
    // handle toto.TEST
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

