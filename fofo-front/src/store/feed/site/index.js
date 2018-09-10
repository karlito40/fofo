import * as _actions from './actions'; 
import _reducer from './reducer'; 
import { createDependency } from '../../../lib/store-component';

const component = createDependency('feed.site', _reducer, _actions);

export default component;
export const actions = component.getActions();