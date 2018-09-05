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

function createAction(namespace, functionName, f) {
  return (...args) => {
    return {
      type: createType(namespace, functionName),
      data: f(...args),
    };
  }
}
