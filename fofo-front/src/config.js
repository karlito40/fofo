const config = {
  env: process.env.NODE_ENV,
};

export default config;

export function isDev() {
  return config.env === 'development';
}