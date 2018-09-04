import { camelCaseToUnderscore } from './String';

export const modules = {
  list: [],
  addModule(mod) {
    this.list.push(mod);
    return mod;
  },
  getReducers() {
    let reducers = {};
    for(let mod of this.list) {
      reducers = {...reducers, ...mod.getReducer()};
    }
    return reducers;
  }
}

export function create(name, reducerTemplate = {}, actionTemplate = {}) {
  const reducer = convertReducerTemplate(name, reducerTemplate);

  return modules.addModule({
    name,
    actions: { ...convertActionTemplate(name, actionTemplate) },
    _defaultReducer: reducer,
    getReducer() {
      return this.name ? { [this.name]: reducer } : {};
    }
  });

}



export function convertReducerTemplate(namespace, reducerTemplate) {
  return (state = reducerTemplate.default, action) => {
    
    const replaceNamespaceWith = {
      self: namespace,
      global: null,
    };

    const ignoreNamespace = { default: true };

    for(let [target, listeners] of Object.entries(reducerTemplate)) {
      if(target in ignoreNamespace) {
        continue;
      }

      if(target in replaceNamespaceWith) {
        target = replaceNamespaceWith[target];
      }

      for(let [functionName, f] of Object.entries(listeners)) {
        let type = createType(target, functionName);
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
