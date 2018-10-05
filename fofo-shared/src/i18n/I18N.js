import { EventEmitter } from 'events'
import Translation from './Translation';

export default class I18N {
  
  constructor(translations = {}, favoriteLanguages = navigator.languages) {
    this.translations = translations;
    this.favoriteLanguages = favoriteLanguages;
    this.fallback = null;
    this.lang = null;
    this.events = new EventEmitter();
    this.detect();
  }

  translate(...args) {
    return this.currentTranslation.get(...args);
  }
  
  detect() {
    if(this.lang) {
      return this;
    }
    
    for(let lang of this.favoriteLanguages) {
      if(this.translations[lang]) {
        this.select(lang); 
        return this;
      }
    }

    if(!this.fallback) {
      this.setFallback(Object.keys(this.translations)[0]);
    }
    
    this.select(this.fallback);

    return this;
  }

  select(lang) {
    this.set({lang});
    this.currentTranslation = new Translation(this.translations[this.lang]);
    return this;
  }

  current() {
    return this.currentTranslation;
  }
    
  setFallback(fallback) {
    return this.set({fallback});
  }

  set(params = {}) {
    const change = {};
    for(let [key, value] of Object.entries(params)) {
      if(this[key] !== value) {
        this[key] = value;
        change[key] = value;
      }
    }

    if(Object.keys(change)) {
      this.events.emit('change', change);
    }

    return this;
  }
}

