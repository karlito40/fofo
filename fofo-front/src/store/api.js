import querystring from 'querystring';
import axios from 'axios';
import config from '../shared/config';

export const REQUEST_COMPLETE = 'complete';
export const REQUEST_ERROR = 'error';
export const REQUEST_LOADING = 'loading';

let token;
export function registerToken(t) {
  token = t;
  if(token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

export function getToken() {
  if(!token) {
    token = localStorage.getItem('token', token);
  }

  return token;
}

export class ActionAPI {
  constructor(method, route, data = {}, customize = {}, payloadOrigin = {}) {
    this.method = method;
    this.route = route;
    this.data = data;
    this.customize = customize;
    this.payloadOrigin = {};  
  }

  with(payloadOrigin) {
    this.payloadOrigin = payloadOrigin;
    return this;
  }

  export() {
    return async (dispatch, getState, extras, createPayload) => {
      dispatch(createPayload({ 
        status: REQUEST_LOADING, 
        payloadOrigin: this.payloadOrigin 
      }));
      
      let apiResult;
      let error;
      try {
        const response = await axios(createAxiosOptions(this.method, this.route, this.data, this.customize));
        apiResult = response.data;
      } catch (e) {
        error = e;
      }

      const status = (error || (typeof apiResult.success !== "undefined" && !apiResult.success)) 
        ? REQUEST_ERROR 
        : REQUEST_COMPLETE;

      if(status === REQUEST_ERROR) {
        dispatch({
          type: 'API.REQUEST_ERROR',
          data: {
            error: error,
            response: apiResult,
            fromType: createPayload().type
          }
        })
      }
      
      return dispatch(createPayload({ 
        error: error,
        response: apiResult,
        status,
        payloadOrigin: this.payloadOrigin,
      }));
    }
  }
}

export default function action(method, route, data = {}, customize = {}, payloadOrigin = {}) {
  return (new ActionAPI(method, route, data, customize, payloadOrigin)).export();
}

function createAxiosOptions(method, route, data = {}, customize = {}) {
  const options = {
    headers: {},
    url: config.apiHost + route,
    method: method.toLowerCase(),
    ...customize,
  };

  if(getToken()) {
    options.headers['Authorization'] = `Bearer ${getToken()}`;
  }
  const isGet = (method.toUpperCase() === 'GET');
  if(!isGet) {
    options.data = (data && data.formData) ? data.formData : data;
  } else if(data && Object.keys(data).length) {
    options.url += '?' + querystring.stringify(data);
  }

  return options;
}