export function camelCaseToUnderscore(s) {
  let res = '';
  s.split('').forEach(c => {
    res += (c.toUpperCase() === c) 
      ? '_' + c
      : c;
  });

  return res.toLowerCase();
}