// Based on the emoji unicode table https://apps.timwhitlock.info/emoji/tables/unicode
const sections = {
  emoticons: ['😁', '🙏'],
  additionalEmoticons: ['😀', '😶'],
  dingbats: ['✂', '➰'],
  transports: ['🚀', '🛀'],
  // enclosed: ['Ⓜ', '🉑'],   // Broken in chrome
  // uncategories: ['©', '🗿'],   // Broken in chrome
  additionalTransports: ['🚁', '🛅'],
  otherSymbols: ['🌍', '🕧']
};

const emojisCategories = {};
let emojisList = null;

export function getCategory(section) {
  return createCategory(section);
}

export function getCategories() {
  for(let section of Object.keys(sections)) {
    createCategory(section);
  }

  return emojisCategories;
}

export function getAll() {
  if(emojisList) {
    return emojisList;
  }

  emojisList = [];
  for(let table of Object.values(sections)) {
    emojisList = [...emojisList, ...findInTable(table[0], table[1])];
  } 

  return emojisList;
}

export function getPreferences() {
  const storage = getStorage();
  return [...storage].sort((a, b) => b.nb - a.nb);
}

export function use(code) {
  let storage = getStorage();
  
  let found = false;
  storage = storage.map(emoji => {
    if(emoji.code === code) {
      found = true;

      const nb = (typeof emoji.nb !== 'undefined') ? ++emoji.nb : 1;
      return {...emoji, nb};
    }

    return emoji;
  });

  if(!found) {
    storage = [...storage, {code, nb: 1}];
  }

  save(storage);

  return getPreferences();
}

let storageCache;
function save(storage) {
  storageCache = storage;
  localStorage.setItem('emoji_store', JSON.stringify(storage));
}

function getStorage() {
  if(!storageCache) {
    let storage = localStorage.getItem('emoji_store');
    storageCache = (storage) ? JSON.parse(storage) : [];
  }

  return storageCache;
}

function findInTable(fromEmoji, toEmoji) {
  const res = [];
  
  const start = fromEmoji.codePointAt(0);
  const end = toEmoji.codePointAt(0);

  for(let code = start; code < end; code++) {
    res.push(String.fromCodePoint(code));
  }

  return res;
}

function createCategory(section) {
  const table = sections[section];
  if(!table) {
    throw new Error(`Emoji::getCategory unrecognized ${section}`);
  }

  if(!emojisCategories[section]) {
    emojisCategories[section] = findInTable(table[0], table[1]);
  }

  return emojisCategories[section];
}