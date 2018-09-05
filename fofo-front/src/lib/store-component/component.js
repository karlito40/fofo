import { createActions } from './action';
import { createTemplateFromComponent } from './reducer';

export function createDependency(name, reducerComponent = {}, actionComponent = {}) {
  return create(name, reducerComponent, actionComponent, true);
}

export function create(name, reducer = {}, actions = {}, isDependency = false) {
  return new Component({
    name,
    isDependency,
    reducer,
    actions
  });
}

export class Component {
  static add(component) {
    return storage.add(component);
  }

  static getCombineReducers() {
    return storage.getCombineReducers();
  }

  constructor(options) {
    this.isDependency = options.isDependency;
    this.name = options.name;
    this.template = createTemplateFromComponent(this, options.reducer);
    this.reducer = this.template._execute();
    this.actions = createActions(this.name, options.actions);

    Component.add(this);
  }

  getActions() {
    return this.actions;
  }
}

const storage = {
  components: [],
  add(component) {
    this.components.push(component);
    return component;
  },
  getCombineReducers() {
    let reducers = {};
    for(let component of this.components) {
      if(!component.isDependency) {
        reducers[component.name] = component.reducer;
      }
    }
    return reducers;
  }
}




