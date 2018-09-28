import * as commands from '../commands';
import * as IPC from '../../shared/ipc';

IPC.listen({commands});
IPC.listen({commands, external: true});
