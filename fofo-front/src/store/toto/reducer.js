// default state
export default {
  default: {
    id: '1-toto',
  },
  self: {
    // handle toto.TEST
    test(state, data) {
      return {...state, ...data};
    },
  }
};

