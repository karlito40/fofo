import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

export default {
  _state: {
    lastSent: null,
    loading: false,
    href: null,
  },
  self: {
    send(state, payload) {
      if(state.href !== (payload.payloadOrigin.href)) {
        return {...state, loading: false};
      }

      switch(payload.status) {
        case REQUEST_LOADING:
          return {...state,  loading: true, lastSent: Date.now()};

        case REQUEST_COMPLETE:
        case REQUEST_ERROR:
        default:
          return {...state, loading: false};
      }

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


