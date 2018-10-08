let cacheStorage;

export function setDefault(storage) {
  if(!localStorage.getItem('storage')) {
    set(storage);
  }
}

export function get() {
  if(cacheStorage) {
    return cacheStorage;
  }

  const storage = localStorage.getItem('storage') || {};

  cacheStorage = (typeof storage === "string") 
    ? JSON.parse(storage)
    : storage;

  return cacheStorage;
}

export function set(params) {
  return save({...get(), ...params});
}

export function save(storage) {
  cacheStorage = storage;
  localStorage.setItem('storage', JSON.stringify(storage));
  return cacheStorage;
}