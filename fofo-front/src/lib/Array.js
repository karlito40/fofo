export function removeDuplicate(arr, withRef) {
  const map = new Map(arr.map(v => [withRef(v), v]));
  return [...map.values()];
}