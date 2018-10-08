const config = {
  env: process.env.NODE_ENV,
  apiHost: process.env.REACT_APP_API_HOST,
  panels: {
    bottom: { theme: 'horizontal' },
    sidebar: { theme: 'vertical' },
    def: { theme: 'horizontal' }
  },
  pageFeedRefreshTimer: parseInt(process.env.REACT_APP_PAGE_FEED_REFRESH_TIMER, 10),
  siteFeedRefreshTimer: parseInt(process.env.REACT_APP_SITE_FEED_REFRESH_TIMER, 10),
  defaultPanel: 'bottom',
  defaultOnDemand: true,
  flashTimeout: 5000,
};

export default config;

export function isDev() {
  return config.env === 'development';
}