import * as React from 'react';
import {Mutation, MutationProps} from 'react-apollo';

import {map} from 'shades';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {DocumentNode} from 'graphql';

export type $Nullable<T> = T | null | undefined;

interface $InputEvent {
	target: {
		value: string;
	};
}

export const targetValue = (f: (value: string) => any) => ({target: {value}}: $InputEvent) =>
	f(value);

export const toQueryString = (params: {[paramName: string]: any}): string =>
	'?' +
	Object.entries(params)
		.map(
			([key, value]: [string, any]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
		)
		.join('&');

export function ifNull<T>(value: T) {
	return (maybeValue: $Nullable<T>): T => maybeValue || value;
}

type QLReducer<Vars, State> = (variables: Vars) => (old: State) => State;

export const updateQL = (query: DocumentNode) => ({
	with: <V, S>(reducer: QLReducer<V, S>) => (
		_: any,
		variables: V,
		{cache}: {cache: InMemoryCache}
	) => {
		const prev = cache.readQuery<S>({query, variables});

		cache.writeQuery({query, variables, data: reducer(variables)(prev)});
		return null;
	}
});

export function inspect<T>(value: T): T {
	console.log(value);
	return value;
}

export const nullToUndefined = map((v: any) => {
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

export const ifEnter = (f: () => any) => (event: React.KeyboardEvent) => {
	if (event.key === 'Enter') {
		f();
	}
};

export const ifElse = <S extends {}>(t: S, f: S) => <C extends {}>(c: C) => (c ? t : f);

interface $MutationConfig<V> {
	simple?: boolean;
	thunk?: boolean;
	toggle?: string | null;
	variable?: string | null;
	children?: (f: (input: V) => any) => React.ReactNode;
}

export const mutation = (mutationString: DocumentNode) => <Vars, Data = any>({
	children = () => null,
	simple = false,
	thunk = false,
	toggle = null,
	variable = null,
	...props
}: $MutationConfig<Vars> & Partial<MutationProps<Data, any>>) => (
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
