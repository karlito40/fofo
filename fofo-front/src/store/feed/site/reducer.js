import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

export default {
  _state: {
    loading: false,
    loadingNext: false,
    pages: []
  },
  self: {
    fetch(state, payload) {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          return {
            ...state, 
            pages: payload.response.data, 
            loading: false
          };
        
        case REQUEST_LOADING:
          return {...state, loading: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loading: false};
      }
    },
  }
};
