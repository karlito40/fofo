import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

export default {
  _state: {
    address: {},
    loading: false,
    loadingNext: false,
    hasMore: true,
    pages: [],
    currentSizeFetch: 1, 
  },
  self: {
    refresh(state, payload) {
      return handleNext(state, payload);
    },

    next(state, payload) {
      return handleNext(state, payload);
    },
  },
  app: {
    setAddress(state, payload) {
      const newAddress = payload;
      
      // We click on a link of our own domain, nothing has to be done
      if(state.address.domain === newAddress.domain) {
        return { ...state, address: newAddress, firstUriVisite: newAddress.uri };
      }
      
      return {
        ...state, 
        address: newAddress,
        firstUriVisite: newAddress.uri,
        hasMore: true,
        loadingNext: false,
        currentSizeFetch: 1,
        pages: [createPlaceholder(newAddress.uri, 'Loading...')]
      };
    }
  } 
};

function handleNext(state, payload) {
  if(state.address.domain !== (payload.payloadOrigin.domain)) {
    return state;
  }

  switch(payload.status) {
    case REQUEST_COMPLETE:
      return {
        ...state, 
        pages: withFirstVisite(payload.response.data, state.firstUriVisite), 
        hasMore: payload.response.has_more,
        currentSizeFetch: payload.response.current_size,
        loadingNext: false
      };
    
    case REQUEST_LOADING:
      return {...state, loadingNext: true};

    case REQUEST_ERROR:
    default:
      return {...state, loadingNext: false};
  }
}

function createPlaceholder(uri, title) {
  return { 
    id: '_0', 
    uri, 
    title: title || '',
    isPlaceholder: true, 
  };   
}

function withFirstVisite(pages, firstUriVisite) {
  // First visited uri to the top
  const currentPage = pages.find(page => page.uri === firstUriVisite && !page.isPlaceholder);
  if(!currentPage) {
    return [...[createPlaceholder(firstUriVisite)], ...pages];
  }

  // Replace the placeholder with the correct page
  return [...[currentPage], ...pages.filter(page => page.uri !== firstUriVisite)];
}