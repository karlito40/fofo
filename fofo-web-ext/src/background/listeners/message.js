import * as commands from '../commands';
import * as ipc from '../../shared/ipc';

ipc.listen({commands});
ipc.listenExternal({commands});
