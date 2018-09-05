import { createType } from './type';

export function createTemplateFromComponent(component, options) {
  return createTemplate({
    ...options,
    _isDependency: component.isDependency,
    _name: component.name
  });
}

export function createReducer(options) {
  const template = createTemplate(options);
  return template._execute();
}

export function createTemplate(options) {
  const template = {...options};
  bindState(template);
  bindParent(template); 
  bindListeners(template);

  template._execute = executeTemplate.bind(null, template);
  
  return template;
}

function executeTemplate(template) {
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

function bindParent(template) {
  if(!template._dependencies) {
    return;
  }
  
  for(let [ref, componentDep] of Object.entries(template._dependencies)) {
    componentDep.template._parent = {
      ref,
      template
    };
  }
}

function bindListeners(template) {
  if(!template._isDependency) {
    template._listeners = getFlatTargets(template);
  }
}

function bindState(template) {
  const dependencies = template._dependencies || {};
  for(let [propState, componentDep] of Object.entries(dependencies)) {
    template._state = {...template._state, ...{[propState]: componentDep.template._state}};
  }
}

function getFlatTargets(template, res = {}) {
  let listeners = getTargets(template);
  for(const [type, fMap] of Object.entries(listeners)) {
    if(!res[type]) {
      res[type] = {};
    }
    
    let [functionName, f] = Object.entries(fMap)[0];
    res[type][functionName] = (res[type][functionName] || []).concat(f);
  }
  
  const dependencies = template._dependencies || {};
  for(let componentDep of Object.values(dependencies)) {
    getFlatTargets(componentDep.template, res);
  }

  return res;
}

function getTargets(template) {
  const res = {};
  const replaceNamespaceWith = { self: template._name };
  
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

function findParentRelation(template, res = null) {
  if(!template._parent) {
    return res;
  }

  const ref = template._parent.ref;
  return findParentRelation(template._parent.template, res ? `${ref}.${res}` : ref);
}
