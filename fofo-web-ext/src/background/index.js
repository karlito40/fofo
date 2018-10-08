import 'babel-polyfill';
import './listeners/tab';
import './listeners/message';
import config from '../shared/config';
import * as StorageBackground from '../shared/storage/background';

StorageBackground.setDefault({
  panel: config.defaultPanel,
  onDemand: config.defaultOnDemand,
});

chrome.browserAction.setBadgeBackgroundColor({color: '#39dd92'});