
import React from 'react';

const Context = React.createContext();

export default Context;
export const I18NProvider = Context.Provider; 
export const I18NConsumer = Context.Consumer; 

export function _(...args) {
  return (
    <I18NConsumer>
      {translation => translation.get(...args)}
    </I18NConsumer>
  );
}