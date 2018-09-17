export function getChannel(uri) {
  if(uri && uri.startsWith('/_channel')) {
    return uri.split('#')[1];
  }
  
  return false;
}