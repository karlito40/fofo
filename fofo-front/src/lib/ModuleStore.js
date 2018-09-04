import { camelCaseToUnderscore } from './String';

export function create(name, reducerTemplate = {}, actionTemplate = {}) {
  const reducer = convertReducerTemplate(name, reducerTemplate);

  const x = {
    name,
    actions: { ...convertActionTemplate(name, actionTemplate) },
    _defaultReducer: reducer,
    getReducer() {
      return this.name ? { [this.name]: reducer } : {};
    }
  };

  return x;
}

export function convertReducerTemplate(namespace, reducerTemplate) {
  return (state = reducerTemplate.default, action) => {
    
    const templates = [
      { listeners: reducerTemplate.module || {}, namespace },
      { listeners: reducerTemplate.global || {} },
    ];
    
    for(let template of templates) {
      for(let [functionName, f] of Object.entries(template.listeners)) {
        let type = createType(template.namespace, functionName);
        if(type === action.type) {
          return f(state, action);
        }
      }
    }

    return state;
  }
}

export function convertActionTemplate(namespace, actionTemplate = {}) {
  const actions = {};
  for(let [functionName, f] of Object.entries(actionTemplate)) {
    actions[functionName] = convertAction(namespace, functionName, f);
  }

  return actions;
}

export function convertAction(namespace, functionName, f) {
  return (...args) => {
    console.log('execute action', namespace, functionName);
    const res = f(...args);
    res.type = createType(namespace, functionName)
    console.log('res', res);
    return res;
  }
}

function createType(namespace, functionName) {
  let type = camelCaseToUnderscore(functionName).toUpperCase();
  if(namespace) {
    type = `${namespace.toUpperCase()}.${type}`;
  }
  return type;
}
