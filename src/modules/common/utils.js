import React from 'react';
import {Mutation} from 'react-apollo';

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

export const ifElse = (t, f) => c => (c ? t : f);

export const mutation = mutationString => ({
	children,
	simple = false,
	thunk = false,
	toggle = false,
	variable = null,
	...props
}) => (
	<Mutation {...props} mutation={mutationString}>
		{(mutationFunc, args) => {
			if (simple) {
				return children(variables => mutationFunc({variables}), args);
			}

			if (variable) {
				return children(value => mutationFunc({variables: {[variable]: value}}), args);
			}

			if (thunk) {
				return children(() => mutationFunc(), args);
			}

			if (toggle) {
				return children(maybeValue =>
					mutationFunc({
						variables: {maybeValue: typeof maybeValue === 'boolean' ? maybeValue : undefined}
					})
				);
			}
			return children(mutationFunc, args);
		}}
	</Mutation>
);

export const mod = (n, m) => ((n % m) + m) % m;
