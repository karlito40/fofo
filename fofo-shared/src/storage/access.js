import { EventEmitter } from 'events'
import serviceIPC from '../ipc';
import * as StorageEmulate from './background';

const events = new EventEmitter();

export { events };

export function setDefault(defaultStorage) {
  const storage = StorageEmulate.get();
  if(!Object.keys(storage).length) {
    StorageEmulate.set(defaultStorage);
  }
}

let cacheStorage;
export async function get() {
  if(cacheStorage) {
    return cacheStorage;
  }

  try {
    cacheStorage = await serviceIPC.background.getStorage();
  } catch (e) {
    console.log('StorageSync cannot call the background script. getStorage() will be emulate');
    cacheStorage = StorageEmulate.get();
  }
  
  return cacheStorage;
}

export function sync(storage) {
  events.emit('sync', storage, cacheStorage);
  cacheStorage = storage;
  return cacheStorage;
}

export async function update(change) {
  try {
    await serviceIPC.background.updateStorage(change);
  } catch (e) {
    console.log('StorageSync cannot call the background script. updateStorage() will be emulate.');
    const oldStorage =  StorageEmulate.get();
    StorageEmulate.set(change);
    cacheStorage = StorageEmulate.get();
    console.log('StorageEmulate send sync');
    events.emit('sync', cacheStorage, oldStorage);
  }
}