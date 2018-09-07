import Posts from './posts';

export default {
  _dependencies: {
    posts: Posts
  },
  _state: {
    id: 'i-am-a-user',
  },
  self: {
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

