import { sync } from '../shared/storage-sync';

export function show() {}

export function syncStorage(storage) {
  return sync(storage);
}