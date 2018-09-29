import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';
import { response } from '../../../lib/store-component';

const defaultState = {
  active: false,
  loading: false,
  finder: {},
  errors: null,
};
export default {
  _state: {...defaultState},
  self: {
    login: handleRequest,
    register: handleRequest, 
    active(state, payload) {
      return {...state, active: payload.active};
    },
    reset() {
      return {...defaultState};
    },
    resetError(state, payload) {
      let errors = null;

      if(state.errors) {
        errors = {...state.errors, [payload.name]: null};
      }

      return {...state,  errors};
    },
    findUser(state, payload, actionId) {
      const query = payload.payloadOrigin.query;
      const findByKey = Object.keys(query)[0];
      if(state.finder[findByKey] && state.finder[findByKey].id > actionId) {
        return state;
      }

      return response({
        [REQUEST_COMPLETE]: () => {
          const finder = {
            ...state.finder, 
            [findByKey]: {
              id: actionId,
              loading: false,
              exist: !!payload.response.data
            }
          }; 

          return { finder };
        },

        [REQUEST_LOADING]: () => {
          const finder = {
            ...state.finder, 
            [findByKey]: {
              id: actionId,
              loading: true,
              exist: false,
            }
          }; 
          return { finder };
        },

        default: () => {
          const finder = {
            ...state.finder, 
            [findByKey]: {
              id: actionId,
              loading: false,
              exist: false,
            }
          }; 
          return { finder };
        }
      });
    }
  },
  
};


function handleRequest(state, payload) {
  return response({
    [REQUEST_COMPLETE]: () => {
      const responseError = payload.response && payload.response.error;
      let errors = (responseError && responseError.code === 'INVALID_INPUTS') 
        ? {...responseError.validator}
        : null;
      
      return {errors, loading: false};
    },
    [REQUEST_LOADING]:  () => ({loading: true}),
    default:            () => ({loading: false})
  });
}