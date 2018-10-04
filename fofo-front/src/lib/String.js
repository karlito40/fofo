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

export function strtr(string, o = {}) {
	let res = string;
  
	for(let find in o) {
 		let replaceBy = o[find];
 		let regex = new RegExp(find, 'g');

 		res = res.replace(regex, replaceBy);
 	}

 	return res;
}