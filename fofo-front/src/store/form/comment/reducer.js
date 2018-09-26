import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

export default {
  _state: {
    create: {
      loading: false,
      lastSent: null,
      active: false,
    },
    href: null,
  },
  self: {
    create(state, payload) {
      let create;
      if(state.href !== (payload.payloadOrigin.href)) {
        create = {...state.create, loading: false};
        return {...state, create };
      }

      switch(payload.status) {
        case REQUEST_LOADING:
          create = {...state.create, loading: true, lastSent: Date.now()};
          return {...state,  create};

        case REQUEST_COMPLETE:
        case REQUEST_ERROR:
        default:
          create = {...state.create, loading: false};
          return {...state, create};
      }
    },
    // update(state, payload) {
    //   return state;
    // },
    activeCreation(state, payload) {
      const create = {...state.create, active: payload.active};
      return {...state, create};
    }
  },
  app: {
    setAddress(state, payload) {
      const { domain, uri } = payload;
      const href = domain + uri;

      return {...state, href, loading: false };
    }
  }
  
};


