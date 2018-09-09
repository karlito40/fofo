import { createType } from './type';

export function createActions(...args) {
  let namespace = null;
  let template = args[0];
  if(args.length > 1) {
    [namespace, template] = args;
  }

  const actions = {};
  for(let [functionName, f] of Object.entries(template)) {
    actions[functionName] = createAction(namespace, functionName, f);
  }

  return actions;
}

export function createPayload(namespace, functionName, data) {
  return {
    type: createType(namespace, functionName),
    data,
  };
}

function createAction(namespace, functionName, f) {
  return (...args) => {
    const res = f(...args);
    
    if(typeof res === 'function') {
      const bindCreatePayload = createPayload.bind(null, namespace, functionName);
      return (...enhancedArgs) => {
        return res(...enhancedArgs, bindCreatePayload);
      };
    }

    return createPayload(namespace, functionName, f);
  }
}

