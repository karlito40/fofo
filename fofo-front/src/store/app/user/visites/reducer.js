import { setToken, REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../../api';
 
export default {
  _state: {
    loading: false,
    sites: [],
  },
  self: {
    fetch(state, payload) {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          return {
            ...state, 
            sites: removeDuplicate(
              [...state.sites, ...payload.response.data], 
              s => s.domain
            ),
            loading: false,
          };
        
        case REQUEST_LOADING:
          return {...state, loading: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loading: false};
      }
    },

    add(state, payload) { 
      let sites;
      const placeholderId = '_' + state.sites.length;
      switch(payload.status) {
        case REQUEST_COMPLETE:
          const site = payload.response.data;
          sites = [
            ...[site], 
            ...state.sites.filter(s => s.id !== placeholderId)
          ];

          return {
            ...state, 
            sites: removeDuplicate(sites, s => s.domain), 
          };
        
        case REQUEST_LOADING:
          const placeholder = {...payload.payloadOrigin, id: placeholderId};
          sites = [...[placeholder], ...state.sites];

          return {
            ...state, 
            sites: removeDuplicate(sites, s => s.domain),  
          };

        case REQUEST_ERROR:
        default:
          return state;
      }
    }
  },
  'app.user': {
    fetch(state, payload) {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          const { visites } = payload.response.data;
          return {
            ...state, 
            loading: false,
            sites: removeDuplicate(
              [...state.sites, ...visites], 
              s => s.domain
            ),
          };
      
        case REQUEST_LOADING:
          return {...state, loading: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loading: false};
      }
    } 
  }
};

function removeDuplicate(arr, withRef) {
  const map = new Map(arr.map(v => [withRef(v), v]));
  return [...map.values()];
}
