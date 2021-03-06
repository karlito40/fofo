import * as _actions from './actions'; 
import _reducer from './reducer'; 
import { create } from '../../lib/store-component';

const component = create('flash', _reducer, _actions);

export default component;
export const actions = component.getActions();
