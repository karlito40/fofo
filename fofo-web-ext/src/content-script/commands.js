import { sync } from '../shared/storage-sync';

export function syncStorage(storage) {
  return sync(storage);
}