import config from '../../config';
import user from './user';
import * as Panel from '../../utils/Panel';

export default {
  _dependencies: { user },
  _state: {
    ...selectPanel(Panel.getDefault()),
    href: null,
    domain: null,
    uri: null,
  },
  self: {
    setAddress(state, payload) {
      const { domain, uri } = payload;
      const href = domain + uri;
      if(state.href === href) {
        return state;
      }
      
      return {
        ...state, 
        href,
        domain,
        uri,
      };
    },
    setPanel(state, payload) {
      return {...state, ...selectPanel(payload.panel)};
    }
  }
};


function selectPanel(panelName) {
  const panelOptions = config.panels[panelName] || config.panels.def;
  return { panel: panelOptions };
}
