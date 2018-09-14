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

export function createPayload(namespace, functionName, data, id) {
  return {
    type: createType(namespace, functionName),
    data,
    id
  };
}

let actionId = 0;
function createAction(namespace, functionName, f) {
  return (...args) => {
    actionId++;

    const actionResponse = f(...args);
    
    if(typeof actionResponse === 'function') {
      const createPayloadExtends = (id => data => {
        return createPayload(namespace, functionName, data, id);
      })(actionId);

      return (...actionDefaultArgs) => {
        return actionResponse(...actionDefaultArgs, createPayloadExtends);
      };
    }

    return createPayload(namespace, functionName, actionResponse, actionId);
  }
}


