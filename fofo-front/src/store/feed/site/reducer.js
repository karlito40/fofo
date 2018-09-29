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
    refresh: handleNext,
    next: handleNext,
  },
  'app.user.visites': {
    add(state, payload) {
      if(state.address.domain === payload.payloadOrigin.address.domain
        && payload.status === REQUEST_LOADING
      ) {
        return {...state, pages: removeNotif(state.pages, payload.payloadOrigin.address.uri)}
      }
      return state;
    }
  },
  app: {
    setAddress(state, payload) {
      const newAddress = payload;
      
      // Only the uri changes
      // We just have to update the active page
      if(state.address.domain === newAddress.domain) {
        return { 
          ...state, 
          address: newAddress, 
          pages: setActive({address: newAddress}, state.pages)
        };
      }

      let pages = [ createPlaceholder(newAddress.uri, 'Loading...') ];
      pages = setActive({address: newAddress}, pages);

      return {
        ...state, 
        address: newAddress,
        firstUriVisite: newAddress.uri,
        hasMore: true,
        loadingNext: false,
        currentSizeFetch: 1,
        pages
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
      const pages = withFirstVisite(payload.response.data, state.firstUriVisite);

      return {
        ...state, 
        pages: setActive(state, pages), 
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

function setActive(state, pages) {
  return pages.map(page => ({...page, active: (page.uri === state.address.uri)})); 
}

function removeNotif(pages, uri) {
  return pages.map(page => {
    return (page.uri === uri) ? {...page, has_new_comment: false} : page;
  });
}