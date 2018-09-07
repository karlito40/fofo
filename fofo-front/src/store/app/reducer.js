import config from '../../config';

export default {
  _state: {
    ...select(config.app.selectedDefault),
  },
  self: {
    setSelected(state, data) {
      return {...state, ...select(data.selected)};
    },
    toggleSelected(state) {
      let newSelected;
      for(let selectable in config.app.availables) {
        if(selectable !== state.selected) {
          newSelected = selectable;
          break;
        }  
      }

      return {...state, ...select(newSelected)};
    }
  }
};


function select(type) {
  if(!config.app.availables[type]) {
    throw new Error(type + 'is not a usable app type');
  }

  return {
    selected: type,
    component: config.app.availables[type],
  }
}
