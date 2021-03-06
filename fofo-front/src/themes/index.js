export { default as GlobalStyle } from './GlobalStyle';

const highlightColor = '#39dd92';

const MENU_WIDTH_HORI = 50;
const MENU_HEIGHT_VERT = 40;
const SITE_FEED_WIDTH_HORI = 350;
const FULL_FIXED_PANEL_HORI = MENU_WIDTH_HORI + SITE_FEED_WIDTH_HORI;

const baseStyle = {
  primaryColor: '#70727c',
  strongColor: 'black',
  lightColor: '#c2c4c7',
  highlightColor: highlightColor,
  notifColor: '#eb6d58',
  errorColor: '#eb6d58',

  primaryBgColor: '#fbfbfb',
  secondaryBgColor: '#ffffff',
  highlightBgColor: highlightColor,

  primaryBoxShadow: '0px 10px 30px 0px rgba(211, 215, 221, 0.4)',

  primaryLineHeight: '1.8',
  primaryFontSize: '14px',

  titleFontSize: '16px',
  minFontSize: '10px',

  messageFormHeight: '45px',
};

const themes = {
  horizontal: {
    ...baseStyle,
    
    menuColor: 'black',
    menuBgColor: baseStyle.secondaryBgColor,
    menuWidth: MENU_WIDTH_HORI + 'px',

    siteFeedWidth: SITE_FEED_WIDTH_HORI + 'px',
    siteFeedLeft: MENU_WIDTH_HORI + 'px',

    panelWidth: FULL_FIXED_PANEL_HORI + 'px', 
  },
  vertical: {
    ...baseStyle,
    
    menuColor: baseStyle.secondaryBgColor,
    menuBgColor: baseStyle.highlightBgColor,
    menuHeight: MENU_WIDTH_HORI + 'px',

    contentWrapperTop: MENU_HEIGHT_VERT + 'px',
  }
};

export function getTheme(selectedApp) {
  const name = { [selectedApp]: true };
  return {...themes[selectedApp], ...name};
}; 

export { themes };