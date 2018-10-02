export function setPanel(panel) {
  return set({...get(), panel});
}

let cacheStorage;
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

export function set(storage) {
  cacheStorage = storage;
  localStorage.setItem('storage', JSON.stringify(storage));
  return cacheStorage;
}