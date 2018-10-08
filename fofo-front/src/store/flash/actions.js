import config from '../../shared/config';
import { MESSAGE_SUCCESS } from './constants';

export function add(text, type = MESSAGE_SUCCESS, timeout = config.flashTimeout) {
  return { text, type, timeout };
}

export function next() {}

