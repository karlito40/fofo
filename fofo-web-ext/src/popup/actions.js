import serviceIPC from '../shared/ipc';

export function selectPanel(panel) {
  return serviceIPC.background.selectPanel(panel);
}