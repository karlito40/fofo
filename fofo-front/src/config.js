import { themes } from './themes';

const availableThemes = Object.keys(themes);

const params = new URLSearchParams(window.location.search)
const withTheme = params.get('theme');

const config = {
  env: process.env.NODE_ENV,
  apiHost: process.env.REACT_APP_API_HOST,
  defaultTheme: withTheme || availableThemes[0],
  // defaultTheme: availableThemes[1],
  themes: availableThemes,
  pageFeedRefreshTimer: parseInt(process.env.REACT_APP_PAGE_FEED_REFRESH_TIMER, 10),
  siteFeedRefreshTimer: parseInt(process.env.REACT_APP_SITE_FEED_REFRESH_TIMER, 10),

  flashTimeout: 5000,
};

export default config;

export function isDev() {
  return config.env === 'development';
}