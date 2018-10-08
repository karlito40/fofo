import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../../api';
import { removeDuplicate } from '../../../../utils/Array';

export default {
  _state: {
    loading: false,
    sites: [],
    domain: null,
  },
  self: {
    fetchByIp(state, payload) {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          const sites = removeDuplicate(
            [...state.sites, ...payload.response.data], 
            s => s.domain
          );

          return {
            ...state, 
            sites: setActive(state, sites),
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
      if(payload.payloadOrigin.onlySetActive) {
        return {...state, sites: setActive(state, state.sites)};
      }

      let sites;
      const placeholderId = '_' + actionId;
      switch(payload.status) {
        case REQUEST_COMPLETE:
          const site = payload.response.data.page.site;
          sites = [
            ...[site], 
            ...state.sites.filter(s => s.id !== placeholderId)
          ];
          sites = removeDuplicate(sites, s => s.domain);

          return {
            ...state, 
            sites: setActive(state, sites), 
          };
        
        case REQUEST_LOADING:
          const placeholder = {...payload.payloadOrigin.address, id: placeholderId};
          sites = [...[placeholder], ...state.sites];
          sites = removeDuplicate(sites, s => s.domain);

          return {
            ...state, 
            sites: setActive(state, sites),  
          };

        case REQUEST_ERROR:
          return {...state, sites: state.sites.filter(s => s.id !== placeholderId) }
        
        default:
          return state;
      }
    }
  },
  'app.user': {
    restore(state, payload) {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          const { visites } = payload.response.data;
          const sites = removeDuplicate(
            [...state.sites, ...visites], 
            s => s.domain
          );

          return {
            ...state, 
            loading: false,
            sites: setActive(state, sites, true),
          };
      
        case REQUEST_LOADING:
          return {...state, loading: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loading: false};
      }
    }
  },
  app: {
    setAddress(state, payload) {
      return {...state, domain: payload.domain};
    }
  } 
};

function setActive(state, sites) {
  return sites.map(site => ({...site, active: (site.domain === state.domain)})); 
}
