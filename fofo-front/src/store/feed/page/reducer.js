import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

export default {
  _state: {
    loading: false,
    loadingNext: false,
    comments: []
  },
  self: {
    fetch(state, payload) {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          return {
            ...state, 
            comments: payload.response.data, 
            loading: false
          };
        
        case REQUEST_LOADING:
          return {...state, loading: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loading: false};
      }
    },
    next(state, payload) {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          return {
            ...state, 
            comments: [...state.comments, ...payload.response.data], 
            loadingNext: false
          };
        
        case REQUEST_LOADING:
          return {...state, loadingNext: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loadingNext: false};
      }
    }
  }
  // app: {
  //   setAddress(state, payload) {
  //     return {...state, comments: [] };
  //   },
  // }
};
