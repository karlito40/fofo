import * as actionTemplate from './actions'; 
import reducer from './reducer'; 
import { create } from '../../lib/ModuleStore';

const _module = create('toto', reducer, actionTemplate);

export default _module;
export const actions = _module.actions;
