import { camelCaseToUnderscore } from '../String';

export function createType(namespace, functionName) {
  let type = camelCaseToUnderscore(functionName).toUpperCase();
  if(namespace && namespace !== 'global') {
    type = `${namespace.toUpperCase()}.${type}`;
  }
  return type;
}