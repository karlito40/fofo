import 'babel-polyfill';
import main from './utils/main';
import * as commands from './commands';
import serviceIPC, * as ipc from '../shared/ipc';
import { bootstrap } from './app';

main(async () => {
  ipc.listen({commands});

  serviceIPC.background.setBadge('#');

  bootstrap();
});
