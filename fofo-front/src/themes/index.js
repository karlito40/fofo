export { default as GlobalStyle } from './GlobalStyle';

const highlightColor = '#39dd92';

const baseStyle = {
  primaryColor: '#70727c',
  strongColor: '#414141',
  highlightColor: highlightColor,
  
  primaryBgColor: '#fbfbfb',
  secondaryBgColor: '#ffffff',
  highlightBgColor: highlightColor,
};

const themes = {
  horizontal: {
    ...baseStyle,
    menuColor: '#646874',
    menuBgColor: baseStyle.secondaryBgColor,
  },
  vertical: {
    ...baseStyle,
    menuColor: baseStyle.secondaryBgColor,
    menuBgColor: baseStyle.highlightBgColor,
  }
}

export function getTheme(selectedApp) {
  const name = { [selectedApp]: true };
  return {...themes[selectedApp], ...name};
}; 

export { themes };