import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';
import { removeDuplicate } from '../../../lib/Array';
import marked from 'marked';

export default {
  _state: {
    loadingNext: false,
    comments: [],
    hasMore: true,
    href: null,
    nextCursor: null,
    firstCursor: null,
    currentUser: null,
  },
  self: {
    refresh(state, payload) {
      if(state.href !== (payload.payloadOrigin.href)) {
        return state;
      }
      
      if(payload.status === REQUEST_COMPLETE) {
        let comments = removeDuplicate(
          [...payload.response.data, ...state.comments], 
          s => s.id
        );

        comments = addOwnerAttribute(state, comments);

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
          let comments = [...state.comments, ...payload.response.data];
          comments = addOwnerAttribute(state, comments);

          return {
            ...state, 
            comments, 
            hasMore: payload.response.has_more,
            nextCursor: payload.response.next_cursor, 
            firstCursor: getFirstCursor(comments),
            loadingNext: false
          };
        
        case REQUEST_LOADING:
          return {...state, loadingNext: true };
    
        case REQUEST_ERROR:
        default:
          return {...state, loadingNext: false, hasMore: false};
      }
    },
    
  },
  'form.comment': {
    create(state, payload, actionId) {
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
          comments = addOwnerAttribute(state, comments);

          return {...state, comments};
        
        case REQUEST_LOADING:
          const placeholder = { 
            id: placeholderId,
            content: marked(payload.payloadOrigin.content), 
            created_at: new Date(),
            isPlaceholder: true,
            user: payload.payloadOrigin.user,
          };
          comments = [...[placeholder], ...state.comments];

          return {...state, comments: comments};
  
        case REQUEST_ERROR: // TODO: REMOVE PLACEHOLDER AND DISPLAY FLASH ERROR
        default:
          return state;
      }
    },
    update(state, payload, actionId) {
      let comments;
      switch(payload.status) {
        case REQUEST_COMPLETE:
          const comment = payload.response.data;
          const change = { ...comment, loading: false }; 

          comments = updateComment(state.comments, change, actionId);
          return {...state, comments: comments};
        
        case REQUEST_LOADING:
          const { payloadOrigin } = payload;
          const { content } = payloadOrigin;

          const body = {
            ...payloadOrigin,
            loading: true,
            ...(content && { 
              content: marked(content)
            })
          };

          comments = updateComment(state.comments, body, actionId);
          return {...state, comments: comments};
        
        // TODO HANDLE ERROR
        case REQUEST_ERROR:
        default:
          return state;
      }
    },
  },
  'app.user': {
    fetch(state, payload) {
      if(payload.status === REQUEST_COMPLETE) {
        const user = payload.response.data;
        const newState = {...state, currentUser: user};
        return {...newState, comments: addOwnerAttribute(newState, state.comments)};
      }

      return state;
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

function updateComment(comments, change, actionId) {
  return comments.map(comment => {
    const isActionAllowed = (!comment.updateId || comment.updateId <= actionId);
    if(comment.id === change.id && isActionAllowed) {
      return {...comment, ...change, updateId: actionId};
    }

    return comment;
  });
}


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

function addOwnerAttribute(state, comments) {
  const { currentUser } = state;
  if(!currentUser) {
    return comments;
  }

  return comments.map(comment => {
    if(comment.user && comment.user.id === currentUser.id) {
      return {...comment, isEditable: true}
    }
    return comment;
  });
}