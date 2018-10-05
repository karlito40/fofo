import assert from 'assert';
import I18N from './I18N';

describe('i18n', () => {
  it('should be able to auto detect the favorite language', () => {
    const i18n = new I18N({
      en: { 'lorem': 'EN text' },
      fr: { 'lorem': 'FR text' },
    }, ['fr-FR', 'fr']);

    assert.equal('fr', i18n.detect().lang);
  });

  it('should be able to use different languagesx', () => {
    const i18n = new I18N({
      en: { 'lorem': 'EN text' },
      fr: { 'lorem': 'FR text' },
    }, ['fr-FR', 'fr']);

    assert.equal('FR text', i18n.translate('lorem'));
    assert.equal('EN text', i18n.select('en').translate('lorem'));
  });
  
  it('should respond with the targeted key if there is no match', () => {
    const i18n = new I18N({
      fr: { 'lorem': 'FR text' },
    }, ['fr-FR', 'fr']);
  
    assert.equal('not.found', i18n.translate('not.found'));
  });
});


