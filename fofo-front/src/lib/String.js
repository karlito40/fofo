export function camelCaseToUnderscore(s) {
  let res = '';
  s.split('').forEach(c => {
    res += (c.toUpperCase() === c) 
      ? '_' + c
      : c;
  });

  return res.toLowerCase();
}

export function ucfirst(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}