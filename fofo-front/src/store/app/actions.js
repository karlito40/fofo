import { actions as visites } from './user/visites';

export function setPanel(panel) {
  return { panel };
}

export function setAddress(domain, uri) {
  const address = { domain, uri };

  return async (dispatch, getState, extras, createPayload) => {
    const hasBeenInit = !getState().app.href;
    const ignoreVisiteReducer = !hasBeenInit;

    dispatch(createPayload(address));
    dispatch(visites.add(address, ignoreVisiteReducer));
  }
}

