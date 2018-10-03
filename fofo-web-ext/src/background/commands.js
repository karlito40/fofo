import serviceIPC from '../shared/ipc';
import * as Storage from './storage';

export function setBadge(text) {
  chrome.browserAction.setBadgeText({text});
}

export function selectPanel(panel) {
  const newStorage = Storage.setPanel(panel);
  // A voir si ca vaut pas le coup de sync tous les
  // onglets.
  // TODO: serviceIPC.content.all().syncStorage(newStorage);
  serviceIPC.content.current().syncStorage(newStorage);
  return newStorage;
}

export function getStorage() {
  return Storage.get();
}

export async function getPopup() {
  return new Promise((resolve, reject) => {
    chrome.browserAction.getPopup({}, resolve);
  });
}