import serviceIPC from '../shared/ipc';
import * as Storage from './storage';

export function setBadge(text) {
  chrome.browserAction.setBadgeText({text});
}

export function updateStorage(params) {
  const newStorage = Storage.set(params);
  serviceIPC.content.current().syncStorage(newStorage);
  return newStorage;
}

export function show() {
  serviceIPC.content.current().show();
}

export function getStorage() {
  return Storage.get();
}

export async function getPopup() {
  return new Promise((resolve, reject) => {
    chrome.browserAction.getPopup({}, resolve);
  });
}