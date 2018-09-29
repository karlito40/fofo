import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../../api';
import { response } from '../../../../lib/store-component';
import { removeDuplicate } from '../../../../lib/Array';

export default {
  _state: {
    loading: false,
    sites: [],
    domain: null,
  },
  self: {
    fetchByIp(state, payload) {
      return response({
        [REQUEST_COMPLETE]: () => {
          const sites = removeDuplicate(
            [...state.sites, ...payload.response.data], 
            s => s.domain
          );

          return { sites: setActive(state, sites), loading: false };
        },
        [REQUEST_LOADING]:  () => ({loading: true}),
        default:            () => ({loading: false})
      });
    },

    add(state, payload, actionId) { 
      if(payload.payloadOrigin.onlySetActive) {
        return {...state, sites: setActive(state, state.sites)};
      }
      
      const placeholderId = '_' + actionId;

      return response({
        [REQUEST_COMPLETE]: () => {
          const site = payload.response.data.page.site;
          let sites = [
            ...[site], 
            ...state.sites.filter(s => s.id !== placeholderId)
          ];
          sites = removeDuplicate(sites, s => s.domain);

          return { sites: setActive(state, sites) };
        },

        [REQUEST_LOADING]: () => {
          const placeholder = {...payload.payloadOrigin.address, id: placeholderId};
          let sites = [...[placeholder], ...state.sites];
          sites = removeDuplicate(sites, s => s.domain);

          return { sites: setActive(state, sites) };
        },

        [REQUEST_ERROR]: () => 
          ({sites: state.sites.filter(s => s.id !== placeholderId)}),
      });
    }
  },
  'app.user': {
    fetch(state, payload) {
      return response({
        [REQUEST_COMPLETE]: () => {
          const { visites } = payload.response.data;
          const sites = removeDuplicate(
            [...state.sites, ...visites], 
            s => s.domain
          );

          return { sites: setActive(state, sites), loading: false };
        },
        [REQUEST_LOADING]:  () => ({loading: true}),
        default:            () => ({loading: false})
      });
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
