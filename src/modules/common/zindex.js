const baseZIndexList = [
	'fullscreen-player',
	0,
	'search-background',
	'search-results',
	'toast',
	'player-expanded',
	'controls',
	'iframeblocker',
	'player',
	'landing',
	'landing-background',
	'landing-outer',
	'landing-rings',
	'landing-center',
	'landing-hole',
	'landing-hero',
	'register',
	'register-x',
	'nav'
];

export default function zindex(element, list = baseZIndexList) {
	const z = list.indexOf(element);
	const zero = list.includes(0) ? list.indexOf(0) : 0;

	if (z) {
		return z - zero;
	}

	throw new Error(`There is no item ${element} in list: ${list}`);
}
