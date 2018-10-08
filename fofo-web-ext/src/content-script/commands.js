import * as StorageAccess from '../shared/storage/access';
import AppData from './app';
import config from '../shared/config';

export async function show() {
  const { panel } = await StorageAccess.get();
  // We dont need to check for the panel status as we want to display something
  AppData.scene.select(panel || config.defaultPanel);
}

export function syncStorage(storage) {
  return StorageAccess.sync(storage);
}