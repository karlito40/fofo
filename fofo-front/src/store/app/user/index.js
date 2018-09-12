import * as _actions from './actions'; 
import _reducer from './reducer'; 
import { createDependency } from '../../../lib/store-component';

const component = createDependency('app.user', _reducer, _actions);

export default component;
export const actions = component.getActions();