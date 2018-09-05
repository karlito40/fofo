export default {
  _state: {
    id: 'i-am-a-post',
  },
  self: {
    test(state, data) {
      return {...state, ...data};
    },
  },
};

