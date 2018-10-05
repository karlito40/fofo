import * as StorageSync from '../shared/storage-sync';
import AppData from './app';
import config from './config';

export async function show() {
  const { panel } = await StorageSync.get();
  // We dont need to check for the panel status as we want to display something
  AppData.scene.select(panel || config.defaultPanel);
}

export function syncStorage(storage) {
  return StorageSync.sync(storage);
}