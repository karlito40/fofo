import { registerI18n } from '../shared/i18n';
import { importDefaults } from '../shared/utils/Context';

const AppData = {
  name: 'parallel-app',
  i18n: null,
  store: null,
};

export function bootstrap() {
  if(AppData.i18n) {
    return AppData;
  }

  const translations = importDefaults(require.context('../shared/translations', false, /\.js$/));
  AppData.i18n = registerI18n(translations);

  return AppData;
}

export default AppData;
