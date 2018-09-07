import VerticalApp from './VerticalApp';
import HorizontalApp from './HorizontalApp';

const config = {
  env: process.env.NODE_ENV,
  app: {
    selectedDefault: 'horizontal',
    availables: {
      horizontal: HorizontalApp,
      vertical: VerticalApp
    }
  }
};

export default config;

export function isDev() {
  return config.env === 'development';
}