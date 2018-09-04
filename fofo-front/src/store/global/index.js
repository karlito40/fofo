import * as actionTemplate from './actions'; 
import { convertActionTemplate } from '../../lib/ModuleStore';

export const actions = convertActionTemplate(null, actionTemplate);
