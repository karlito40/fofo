import { merge } from '../../../lib/store-component';
import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

export default {
  _state: {
    loading: false,
    loadingNext: false,
    sites: []
  },
  self: {
    fetch: (state, payload) => merge(state, () => {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          return { sites: payload.response.data, loading: false };
        
        case REQUEST_LOADING:
          return { loading: true };
    
        case REQUEST_ERROR:
        default:
          return { loading: false };
      }
    }),
  }
};
