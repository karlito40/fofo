import queryString from 'query-string';
import axios from 'axios';
import { delProperties } from '../lib/Object';
import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from './constants';
import config from '../config';

let token;
export function setToken(t) {
  token = t;
}

export default {
  action(method, route, data = {}, customize = {}) {
    return (dispatch, getState, extras, createPayload) => {
      dispatch(createPayload({ status: REQUEST_LOADING }));

      return axios(createAxiosOptions(method, route, data, customize))
        .then(response => {
          const status = (typeof response.data.success != "undefined" && !response.data.success)
            ? REQUEST_ERROR
            : REQUEST_COMPLETE;
          
          return dispatch(createPayload({ 
            response: response.data,
            status,
          }));
        })
        .catch(error => {
          return dispatch(createPayload({
            response: error,
            status: REQUEST_ERROR,
          }));
        });
    };
  }
};

function createAxiosOptions(method, route, data = {}, customize = {}) {
  const options = {
    headers: {},
    url: config.apiHost + route,
    method: method.toLowerCase(),
    ...customize,
  };

  if(token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if(data && data._query) {
    options.url += '?' + queryString.stringify(data._query);
  }

  delProperties(data, ['_query']);
  options.data = (data && data.formData) ? data.formData : data;

  return options;
}