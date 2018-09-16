import apiCall from '../../api';

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