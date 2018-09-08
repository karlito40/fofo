export { default as GlobalStyle } from './GlobalStyle';

const highlightColor = '#39dd92';

const MENU_WIDTH_HORI = 40;
const SITE_FEED_WIDTH_HORI = 350;
const FULL_FIXED_PANEL_HORI = MENU_WIDTH_HORI + SITE_FEED_WIDTH_HORI;

const baseStyle = {
  primaryColor: '#70727c',
  strongColor: '#414141',
  highlightColor: highlightColor,
  lightColor: '#c2c4c7',
  
  primaryBgColor: '#fbfbfb',
  secondaryBgColor: '#ffffff',
  highlightBgColor: highlightColor,

  primaryBoxShadow: '0px 10px 30px 0px rgba(211, 215, 221, 0.4)',

  primaryLineHeight: '1.8',
  primaryFontSize: '14px',

  titleFontSize: '16px',
  minFontSize: '10px',
};

const themes = {
  horizontal: {
    ...baseStyle,
    
    menuColor: '#646874',
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
  }
};

export function getTheme(selectedApp) {
  const name = { [selectedApp]: true };
  return {...themes[selectedApp], ...name};
}; 

export { themes };