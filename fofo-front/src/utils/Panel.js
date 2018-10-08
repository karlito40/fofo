import config from '../shared/config';

export function getDefault() {
  const params = new URLSearchParams(window.location.search)
  const withPanel = params.get('panel');
  return withPanel || config.defaultPanel;
}
