import querystring from 'querystring';
import axios from 'axios';
import { delProperties } from '../lib/Object';
import config from '../config';

export const REQUEST_COMPLETE = 'complete';
export const REQUEST_ERROR = 'error';
export const REQUEST_LOADING = 'loading';

let token;
export function setToken(t) {
  token = t;
  localStorage.setItem('token', token);
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
    return (dispatch, getState, extras, createPayload) => {
      dispatch(createPayload({ 
        status: REQUEST_LOADING, 
        payloadOrigin: this.payloadOrigin 
      }));
  
      return axios(createAxiosOptions(this.method, this.route, this.data, this.customize))
        .then(response => {
          const status = (typeof response.data.success != "undefined" && !response.data.success)
            ? REQUEST_ERROR
            : REQUEST_COMPLETE;
          
          return dispatch(createPayload({ 
            response: response.data,
            status,
            payloadOrigin: this.payloadOrigin,
          }));
        })
        .catch(error => {
          return dispatch(createPayload({
            response: error,
            status: REQUEST_ERROR,
            payloadOrigin: this.payloadOrigin,
          }));
        });
    }; 
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

  if(data && data.query) {
    options.url += '?' + querystring.stringify(data.query);
  }

  delProperties(data, ['query']);
  options.data = (data && data.formData) ? data.formData : data;

  return options;
}