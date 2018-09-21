import {map} from 'shades';
export const targetValue = f => ({target: {value}}) => f(value);

export const toQueryString = params =>
	'?' +
	Object.entries(params)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');

export const ifNull = value => maybeValue => maybeValue || value;

export const updateQL = query => ({
	with: reducer => (_, variables, {cache}) => {
		const prev = cache.readQuery({query, variables});

		cache.writeQuery({query, variables, data: reducer(variables)(prev)});
		return null;
	}
});

export function inspect(value) {
	console.log(value);
	return value;
}

export const nullToUndefined = map(v => {
	if (v === null) {
		return undefined;
	}

	if (Array.isArray(v)) {
		return map(nullToUndefined)(v);
	}

	if (typeof v === 'object') {
		return nullToUndefined(v);
	}

	return v;
});

export const ifEnter = f => event => {
	if (event.key === 'Enter') {
		f();
	}
};
