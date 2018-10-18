import * as React from 'react';
import {Mutation, MutationProps} from 'react-apollo';

import {map} from 'shades';

export const targetValue = (f: (value: string) => any) => ({target: {value}}) => f(value);

export const toQueryString = (params: {[paramName: string]: string}): string =>
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

export function inspect<T>(value: T): T {
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

interface $MutationProps<V> {
	simple: boolean | undefined;
	thunk: boolean | undefined;
	toggle: string | null;
	variable: string | null;
	children: (f: (input: V) => any) => JSX.Element;
}

export const mutation = mutationString => <Vars, Data = any>({
	children,
	simple = false,
	thunk = false,
	toggle = null,
	variable = null,
	...props
}: $MutationProps<Vars> & MutationProps<Data, any>) => (
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
						variables: {[toggle]: typeof maybeValue === 'boolean' ? maybeValue : undefined}
					})
				);
			}
			return children(mutationFunc, args);
		}}
	</Mutation>
);

export const mod = (n: number, m: number): number => ((n % m) + m) % m;

export const toggleOr = (maybeValue: boolean | undefined) => (oldValue: boolean): boolean =>
	typeof maybeValue === 'boolean' ? maybeValue : !oldValue;
