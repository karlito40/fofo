import { themes } from './themes';

const availableThemes = Object.keys(themes);

const config = {
  env: process.env.NODE_ENV,
  defaultTheme: availableThemes[0],
  themes: availableThemes
};

export default config;

export function isDev() {
  return config.env === 'development';
}