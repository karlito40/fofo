import { themes } from './themes';

const availableThemes = Object.keys(themes);

const config = {
  env: process.env.NODE_ENV,
  apiHost: process.env.REACT_APP_API_HOST,
  defaultTheme: availableThemes[0],
  // defaultTheme: availableThemes[1],
  themes: availableThemes,
  pageFeedRefreshTimer: parseInt(process.env.REACT_APP_PAGE_FEED_REFRESH_TIMER, 10),
  siteFeedRefreshTimer: parseInt(process.env.REACT_APP_SITE_FEED_REFRESH_TIMER, 10),
};

export default config;

export function isDev() {
  return config.env === 'development';
}