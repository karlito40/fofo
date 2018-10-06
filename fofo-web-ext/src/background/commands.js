import serviceIPC from '../shared/ipc';
import * as StorageBackground from '../shared/storage/background';

export function setBadge(text) {
  chrome.browserAction.setBadgeText({text});
}

export function updateStorage(params) {
  const newStorage = StorageBackground.set(params);
  serviceIPC.content.current().syncStorage(newStorage);
  return newStorage;
}

export function show() {
  serviceIPC.content.current().show();
}

export function getStorage() {
  return StorageBackground.get();
}

export async function getPopup() {
  return new Promise((resolve, reject) => {
    chrome.browserAction.getPopup({}, resolve);
  });
}