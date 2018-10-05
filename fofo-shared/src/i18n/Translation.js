export default class Translation { 
  constructor(messages) {
    this.messages = messages || {};
  }

  get(key, replaceWith) {
    const text = this.messages[key];
    return (text) ? strtr(text, replaceWith) : key;
  }
}

function strtr(string, o = {}) {
	let res = string;
  
	for(let find in o) {
 		let replaceBy = o[find];
 		let regex = new RegExp(find, 'g');

 		res = res.replace(regex, replaceBy);
 	}

 	return res;
}
