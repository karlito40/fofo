import { camelCaseToUnderscore } from './String';

export const modules = {
  registers: [],
  dependencies: [],
  addModule(mod, isDependency = false) {
    const target = isDependency ? this.dependencies : this.registers;
    target.push(mod);
    return mod;
  },
  findDependency(name) {
    return this.dependencies.find(mod => mod.name === name);
  },
  getCombineReducers() {
    let reducers = {};
    for(let mod of this.registers) {
      reducers = {...reducers, ...mod.getCombineReducer()};
    }
    return reducers;
  }
}

export function createDependency(name, template = {}, actionTemplate = {}) {
  return create(name, template, actionTemplate, true);
}

export function create(name, reducerComponent = {}, actionTemplate = {}, isDependency = false) {
  const template = createReducerTemplate(name, reducerComponent, isDependency);
  const reducer = convertReducerTemplate(template);
  return modules.addModule({
    name,
    template,
    reducer: reducer,
    actions: { ...convertActionTemplate(name, actionTemplate) },
    getCombineReducer() {
      return this.name ? { [this.name]: reducer } : {};
    }
  }, isDependency);

}



export function createReducerTemplate(namespace, reducerComponent, isDependency) {
  const template = {
    ...reducerComponent, 
    _isDependency: isDependency,
    _namespace: namespace,
    _state: {
      ...reducerComponent._state,
      ...getStateDependencies(reducerComponent)
    }
  };

  bindParent(template); 

  if(!template._isDependency) {
    template._listeners = getFlatEvents(template);
  }

  return template;
}

export function convertReducerTemplate(template) {
  if(!template._listeners) {
    return () => {
      throw new Error('cannot call directly a dependency reducer');
    }
  }

  return (state = template._state, action) => {
    for(let [type, fMap] of Object.entries(template._listeners || {})) {
      if(type === action.type) {
        let receivers = Object.values(fMap)[0];
        let newState = state;
        for(let receiver of receivers) {
          let { handler, relation } = receiver;
          let scope = getScope(relation, newState);
          newState = replaceScope(relation, newState, handler(scope, action.data));
        }
        
        return newState;
      }
    
    }

    return state;
  }
}

export function convertActionTemplate(...args) {
  let namespace = null;
  let actionTemplate = args[0];
  if(args.length > 1) {
    [namespace, actionTemplate] = args;
  }

  const actions = {};
  for(let [functionName, f] of Object.entries(actionTemplate)) {
    actions[functionName] = convertAction(namespace, functionName, f);
  }

  return actions;
}

export function convertAction(namespace, functionName, f) {
  return (...args) => {
    return {
      type: createType(namespace, functionName),
      data: f(...args),
    };
  }
}

function createType(namespace, functionName) {
  let type = camelCaseToUnderscore(functionName).toUpperCase();
  if(namespace && namespace !== 'global') {
    type = `${namespace.toUpperCase()}.${type}`;
  }
  return type;
}


function getScope(relation, source) {
  if(!source || !relation || !relation.length) {
    return source;
  }

  if(!Array.isArray(relation)) {
    relation = relation.split('.');
  }
  
  const key = relation.shift();
  return getScope(relation, source[key]);
}

function replaceScope(relation, source, by) {
  if(!relation || !relation.length || !source) {
    return by;
  }

  if(!Array.isArray(relation)) {
    relation = relation.split('.');
  }
  
  const key = relation.shift();
  return {...source, [key]: replaceScope(relation, source[key], by)};
}

function getStateDependencies(template) {
  let state = {};
  const dependencies = template._dependencies || {};
  for(let [propsState, mod] of Object.entries(dependencies)) {
    state = {...state, ...{[propsState]: mod.template._state}};
  }

  return state;
}

function getFlatEvents(template, res = {}) {
  let listeners = getEvents(template);
  for(const [type, fMap] of Object.entries(listeners)) {
    if(!res[type]) {
      res[type] = {};
    }
    
    let [functionName, f] = Object.entries(fMap)[0];
    res[type][functionName] = (res[type][functionName] || []).concat(f);
  }
  
  const dependencies = template._dependencies || {};
  for(let mod of Object.values(dependencies)) {
    getFlatEvents(mod.template, res);
  }

  return res;
}

function getEvents(template) {
  const res = {};
  const replaceNamespaceWith = { self: template._namespace };
  
  for(let [targetNamespace, functions] of Object.entries(template)) {
    if(targetNamespace.startsWith('_')) {
      continue;
    }

    if(targetNamespace in replaceNamespaceWith) {
      targetNamespace = replaceNamespaceWith[targetNamespace];
    }

    for(let [functionName, f] of Object.entries(functions)) {
      let type = createType(targetNamespace, functionName);
      
      if(!res[type]) {
        res[type] = {};
      }
      res[type][functionName] = {
        handler: f,
        relation: findParentRelation(template) 
      };
    }

  }

  return res;
}

function bindParent(template) {
  if(!template._dependencies) {
    return;
  }
  
  for(let [key, modDependency] of Object.entries(template._dependencies)) {
    modDependency.template._parent = {[key]: template};
  }
}


function findParentRelation(template, res = null) {
  if(!template._parent) {
    return res;
  }

  let [ref, parentTemplate] = Object.entries(template._parent)[0];
  return findParentRelation(parentTemplate, res ? `${ref}.${res}` : ref);
}