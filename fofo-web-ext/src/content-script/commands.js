// import { EventEmitter } from 'events'
import { sync } from '../shared/storage-sync';

export function syncStorage(storage) {
  return sync(storage);
}