import config from '../../config';
import Me from './me';

export default {
  _dependencies: {
    me: Me,
  },
  _state: {
    ...selectTheme(config.defaultTheme),
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
    setTheme(state, payload) {
      return {...state, ...selectTheme(payload.theme)};
    },
    toggleTheme(state) {
      let newTheme;
      for(let selectable of config.themes) {
        if(selectable !== state.theme) {
          newTheme = selectable;
          break;
        }  
      }

      return {...state, ...selectTheme(newTheme)};
    }
  }
};


function selectTheme(theme) {
  if(config.themes.indexOf(theme) === -1) {
    throw new Error(theme + ' is not a usable theme');
  }

  return { theme };
}
