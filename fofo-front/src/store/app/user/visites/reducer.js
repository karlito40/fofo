import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../../api';
import { removeDuplicate } from '../../../../lib/Array';

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

    add(state, payload, actionId) { 
      let sites;
      const placeholderId = '_' + actionId;
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
          return {...state, sites: state.sites.filter(s => s.id !== placeholderId) }
        
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
