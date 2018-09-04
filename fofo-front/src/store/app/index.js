import * as actionTemplate from './actions'; 
import reducer from './reducer'; 
import { create } from '../../lib/ModuleStore';

const _module = create('app', reducer, actionTemplate);

export default _module;
export const actions = _module.actions;
