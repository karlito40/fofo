import { EventEmitter } from 'events'
import serviceIPC from './ipc';

const events = new EventEmitter();

export { events };

let cacheStorage;
export async function get() {
  if(cacheStorage) {
    return cacheStorage;
  }

  cacheStorage = await serviceIPC.background.getStorage();
  return cacheStorage;
}

export function sync(storage) {
  events.emit('sync', storage, cacheStorage);
  cacheStorage = storage;
  return cacheStorage;
}