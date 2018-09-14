import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

export default {
  _state: {
    loading: false,
    loadingNext: false,
    loadingForm: false,
    comments: [],
    hasMore: true,
    href: null,
    lastSent: null,
    cursorNext: null,
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
      if(state.href !== (payload.payloadOrigin.href)) {
        return state;
      }

      switch(payload.status) {
        case REQUEST_COMPLETE:
          return {
            ...state, 
            comments: [...state.comments, ...payload.response.data], 
            hasMore: payload.response.has_more,
            cursorNext: payload.response.next_cursor, 
            loadingNext: false
          };
        
        case REQUEST_LOADING:
          return {...state, loadingNext: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loadingNext: false, hasMore: false};
      }
    },
    sendMessage(state, payload, actionId) {
      if(state.href !== (payload.payloadOrigin.href)) {
        return {...state, loadingForm: false};
      }

      const placeholderId = '_' + actionId;
      let comments;

      switch(payload.status) {
        case REQUEST_COMPLETE:
          const comment = payload.response.data;
          comments = [
            ...[comment], 
            ...state.comments.filter(s => s.id !== placeholderId)
          ];
  
          return {...state, comments, loadingForm: false};
        
        case REQUEST_LOADING:
          const placeholder = { content: payload.payloadOrigin.content, id: placeholderId};
          comments = [...[placeholder], ...state.comments];

          return {...state, comments: comments, loadingForm: true, lastSent: Date.now()};
  
        case REQUEST_ERROR:
        default:
          return {...state, loadingForm: true};
      }
    }
  },
  app: {
    setAddress(state, payload) {
      const { domain, uri } = payload;
      const href = domain + uri;

      return {...state, 
        href, 
        loadingForm: false, 
        comments: [],
        hasMore: true,
        cursorNext: null,
      }
    }
  } 
};
