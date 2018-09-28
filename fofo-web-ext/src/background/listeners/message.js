import * as commands from '../commands';
import * as ipc from '../../shared/ipc';

ipc.listen({commands});
ipc.listen({commands, external: true});
