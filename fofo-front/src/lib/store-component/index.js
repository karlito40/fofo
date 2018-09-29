export { createActions } from './action';
export { createReducer } from './reducer';
export { Component, create, createDependency } from './component';

export function merge(baseState, makeState) {
  return {...baseState, ...makeState()};
}