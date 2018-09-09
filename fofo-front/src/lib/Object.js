export const delProperties = (o, keys = []) => {
  if(!o) {
    return;
  }

  for(const key of keys) {
    delete o[key];
  }
}
