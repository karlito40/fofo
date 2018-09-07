import { availableApps, indexDefaultApp } from './apps';

const config = {
  env: process.env.NODE_ENV,
  app: {
    selectedDefault: indexDefaultApp,
    availables: availableApps
  }
};

export default config;

export function isDev() {
  return config.env === 'development';
}