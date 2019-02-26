const baseZIndexList = [
  0,
  'toast',
  'player',
  'iframeblocker',
  'hiddenplaytoggle',
  'controls',
  'nav',
  'footer',
  'search',
  'search-results',
  'header'
];

export default function zindex(element, list = baseZIndexList) {
  const z = list.indexOf(element);
  const zero = list.includes(0) ? list.indexOf(0) : 0;

  if (z > -1) {
    return z - zero;
  }

  throw new Error(`There is no item ${element} in list: ${list}`);
}
