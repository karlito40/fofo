import { setToken, REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';
import { ucfirst } from '../../../lib/String';
import Visites from './visites';

const dependencies = {
  visites: Visites,
};
export default {
  _dependencies: dependencies,
  _state: {
    loading: false,
    isLogged: false,
  },
  self: {
    // restore(state, payload) {
    //   if(!payload) {
    //     console.log('Unable to restore myself');
    //     return state;
    //   }

    //   return FetchHandler.with(state, payload);
    // },
    login(state, payload) {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          const { user } = payload.response.data;
    
          setToken(payload.response.data.access_token);
    
          return {...state, ...user, loading: false, isLogged: true};
        
        case REQUEST_LOADING:
          return {...state, loading: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loading: false};
      }
    },
    fetch(state, payload) {
      return FetchHandler.with(state, payload);
    },

    // addVisite(state, payload) {
    //   let visites;
    //   const placeholderId = '_' + state.visites.length;
    //   switch(payload.status) {
    //     case REQUEST_COMPLETE:
    //       const { site } = payload.response.data;
    //       visites = [
    //         ...[site], 
    //         ...state.visites.filter(s => s.id !== placeholderId)
    //       ];

    //       return {
    //         ...state, 
    //         visites: removeDuplicate(visites, s => s.domain), 
    //       };
        
    //     case REQUEST_LOADING:
    //       const placeholder = {...payload.payloadOrigin, id: placeholderId};
    //       visites = [...[placeholder], ...state.visites];

    //       return {
    //         ...state, 
    //         visites: removeDuplicate(visites, s => s.domain),  
    //       };
    
    //     case REQUEST_ERROR:
    //     default:
    //       return state;
    //   }
    // }
  }
};

function removeDuplicate(arr, withRef) {
  const map = new Map(arr.map(v => [withRef(v), v]));
  return [...map.values()];
}

const FetchHandler = {
  with(state, payload, relation) {
    const target = relation || '';
    
    const handler = this[`exec${ucfirst(target)}`];
    const res = handler ? handler(state, payload) : {};

    const loadingRelation = `loading${ucfirst(target)}`;
    return {
      ...res, 
      [loadingRelation]: (payload.status === REQUEST_LOADING)
    };

  },
  exec(state, payload) {
    switch(payload.status) {
      case REQUEST_COMPLETE:
        return {...state, ...payload.response.data, loading: false, isLogged: true};

      case REQUEST_LOADING:
        return {...state, loading: true};
  
      case REQUEST_ERROR:
      default:
        return {...state, loading: false};
    }
  },
  // execVisites(state, payload) {
  //   if(payload.status !== REQUEST_COMPLETE) {
  //     return state
  //   }

  //   return {
  //     ...state, 
  //     visites: removeDuplicate(
  //       [...state.visites, ...payload.response.data], 
  //       s => s.domain
  //     ),
  //   }
  // }
}