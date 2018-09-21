import apiCall, { ActionAPI } from '../../api';

export function active(active) {
  return { active };
}

export function register(data) {
  return apiCall('POST', '/register', {
    ...data, 
    c_password: data.password 
  });
}

export function login(data) {
  return apiCall('POST', '/login', data);
}

export function findUser(params) {
  return (new ActionAPI('GET', '/user', params))
    .with({ query: params })
    .export();
}

export function reset() {}
export function resetError(name) {
  return { name };
}