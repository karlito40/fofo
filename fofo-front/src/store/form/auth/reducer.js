import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

const defaultState = {
  active: false,
  loading: false,
  finder: {},
  errors: null,
};
export default {
  _state: {...defaultState},
  self: {
    active(state, payload) {
      return {...state, active: payload.active};
    },
    login(state, payload) {
      return handleRequest(state, payload);
    },
    register(state, payload) {
      return handleRequest(state, payload);
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

      let finder;

      switch(payload.status) {
        case REQUEST_COMPLETE:
          finder = {
            ...state.finder, 
            [findByKey]: {
              id: actionId,
              loading: false,
              exist: !!payload.response.data
            }
          }; 

          return {...state,  finder};

        case REQUEST_LOADING:
          finder = {
            ...state.finder, 
            [findByKey]: {
              id: actionId,
              loading: true,
              exist: false,
            }
          }; 
          return {...state,  finder};

        case REQUEST_ERROR:
        default:
          finder = {
            ...state.finder, 
            [findByKey]: {
              id: actionId,
              loading: false,
              exist: false,
            }
          }; 
          return {...state, finder};
      }
    }
  },
  
};


function handleRequest(state, payload) {
  switch(payload.status) {
    case REQUEST_ERROR:
      const responseError = payload.response && payload.response.error;
      let errors = null;
      if(responseError && responseError.code === 'INVALID_INPUTS') {
        errors = {...responseError.validator};
      } else if(responseError && responseError.code === 'INVALID_CREDENTIALS') {
        errors = {email: ['Login fail']};
      }
      
      return {...state, errors, loading: false};

    case REQUEST_LOADING:
      return {...state,  loading: true};

    case REQUEST_COMPLETE:  
    default:
      return {...state, loading: false};

  }
}