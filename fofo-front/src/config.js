import { themes } from './themes';

const config = {
  env: process.env.NODE_ENV,
  apiHost: process.env.REACT_APP_API_HOST,
  // defaultTheme: availableThemes[0],
  // defaultTheme: availableThemes[1],
  // themes: availableThemes,
  panels: {
    bottom: { theme: 'horizontal' },
    sidebar: { theme: 'vertical' },
    def: { theme: 'horizontal' }
  },
  pageFeedRefreshTimer: parseInt(process.env.REACT_APP_PAGE_FEED_REFRESH_TIMER, 10),
  siteFeedRefreshTimer: parseInt(process.env.REACT_APP_SITE_FEED_REFRESH_TIMER, 10),
  defaultPanel: 'bottom',
  defaultOnDemand: false,
  flashTimeout: 5000,
};

export default config;

export function isDev() {
  return config.env === 'development';
}