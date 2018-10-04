import I18N from './I18N';

let i18n;
export function registerI18n(translations) {
  i18n = new I18N(translations);
  return i18n;
}

export function _(...args) {
  return i18n.translate(...args);
}

export function getI18N() {
  return i18n;
}
