import { strtr } from './String';

export function importDefaults(context) {
  const res = {};
  
  context.keys().forEach(fileName => {
    const exportName = strtr(fileName, {
      '.js': '',
      '../' : '',
      './': ''
    });
    
    res[exportName] = context(fileName).default;
  })

  return res;
}