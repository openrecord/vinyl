import { InMemoryCache } from 'apollo-cache-inmemory';
import { DocumentNode } from 'graphql';
import * as React from 'react';
import { map } from 'shades';

export type $Nullable<T> = T | null | undefined;
export type $Undef<T> = T | undefined;

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

export function inspect<T>(value: T, ...args: any[]): T {
	console.log(value, ...args);
	return value;
}

// prettier-ignore
type NullToUndefined<T> = 
	T extends undefined ? undefined : 
	T extends null ? undefined : 
	T extends object ? {[P in keyof T]: NullToUndefined<T>}  :
	T;

// prettier-ignore
export const nullToUndefined = <T,>(v: T): NullToUndefined<T> | undefined => {
	if (v === null || v === undefined) {
		return undefined;
	}

	if (Array.isArray(v)) {
		// @ts-ignore: TODO
		return map(nullToUndefined)(v);
	}

	if (typeof v === 'object') {
		// @ts-ignore: TODO
		return map(nullToUndefined)(v);
	}

	// @ts-ignore
	return v;
};

export const ifEnter = (f: () => any) => (event: React.KeyboardEvent) => {
	if (event.key === 'Enter') {
		f();
	}
};

export const ifElse = <S extends {}>(t: S, f: S) => <C extends {}>(c: C) => (c ? t : f);

export const modulo = (n: number, m: number): number => ((n % m) + m) % m;

export const toggleOr = (maybeValue: $Undef<boolean>) => (oldValue: boolean): boolean =>
	typeof maybeValue === 'boolean' ? maybeValue : !oldValue;
