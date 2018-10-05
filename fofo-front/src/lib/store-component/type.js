import { camelCaseToUnderscore } from '../../shared/utils/String';

export function createType(namespace, functionName) {
  let type = camelCaseToUnderscore(functionName).toUpperCase();
  if(namespace && namespace !== 'global') {
    type = `${namespace.toUpperCase()}.${type}`;
  }
  return type;
}
