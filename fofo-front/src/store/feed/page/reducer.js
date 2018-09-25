import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';
import { removeDuplicate } from '../../../lib/Array';

export default {
  _state: {
    loading: false,
    loadingNext: false,
    comments: [],
    hasMore: true,
    href: null,
    nextCursor: null,
    firstCursor: null,
  },
  self: {
    refresh(state, payload) {
      if(state.href !== (payload.payloadOrigin.href)) {
        return state;
      }
      
      if(payload.status === REQUEST_COMPLETE) {
        const comments = removeDuplicate(
          [...payload.response.data, ...state.comments], 
          s => s.id
        );

        const nextCursor = (!state.nextCursor)
          ? payload.response.next_cursor 
          : state.nextCursor;

        return {
          ...state, 
          comments,
          firstCursor: getFirstCursor(comments),
          nextCursor
        };
      }
      return state;
    },
    next(state, payload) {
      if(state.href !== (payload.payloadOrigin.href)) {
        return state;
      }

      switch(payload.status) {
        case REQUEST_COMPLETE:
          const comments = [...state.comments, ...payload.response.data];
          return {
            ...state, 
            comments, 
            hasMore: payload.response.has_more,
            nextCursor: payload.response.next_cursor, 
            firstCursor: getFirstCursor(comments),
            loadingNext: false
          };
        
        case REQUEST_LOADING:
          return {...state, loadingNext: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loadingNext: false, hasMore: false};
      }
    },
    
  },
  'form.comment': {
    send(state, payload, actionId) {
      if(state.href !== (payload.payloadOrigin.href)) {
        return state;
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
  
          return {...state, comments};
        
        case REQUEST_LOADING:
          const placeholder = { 
            id: placeholderId,
            content: payload.payloadOrigin.content, 
            created_at: new Date(),
            isPlaceholder: true,
            user: payload.payloadOrigin.user,
          };
          comments = [...[placeholder], ...state.comments];

          return {...state, comments: comments};
  
        case REQUEST_ERROR:
        default:
          return state;
      }
    }
  },
  app: {
    setAddress(state, payload) {
      const { domain, uri } = payload;
      const href = domain + uri;

      return {
        ...state, 
        href, 
        loadingNext: false,
        comments: [],
        hasMore: true,
        nextCursor: null,
        firstCursor: null,
      }
    }
  } 
};


function getFirstCursor(comments) {
  if(!comments || !comments.length) {
    return null;
  }

  for(let comment of comments) {
    if(!comment.isPlaceholder) {
      return comment.id;
    }
  }

  return null;
}
