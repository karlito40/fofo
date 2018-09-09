import config from '../../config';
import Me from './me';

export default {
  _dependencies: {
    me: Me,
  },
  _state: {
    ...selectTheme(config.defaultTheme),
  },
  self: {
    setTheme(state, data) {
      return {...state, ...selectTheme(data.theme)};
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
