import {DocumentNode} from 'graphql';
import * as React from 'react';
import {useQuery} from 'react-apollo-hooks';
import {map} from 'shades';

import {$Color} from '../store';

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

export function inspect<T>(value: T, ...args: any[]): T {
	console.log(value, ...args);
	return value;
}

// prettier-ignore
export const nullToUndefined = <T>(v: T): T => {
	if (v === null || v === undefined) {
		// @ts-ignore
		return undefined;
	}

	if (Array.isArray(v)) {
		// @ts-ignore
		return map(nullToUndefined)(v);
	}

	if (typeof v === 'object') {
		// @ts-ignore
		return map(nullToUndefined)(v);
	}

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

export const toRGBString = ({r, g, b, a = 1}: $Color) => `rgba(${r}, ${g}, ${b}, ${a})`;
export const toHexString = ({r, g, b, a = 1}: $Color) =>
	`#(${r.toString(16)}, ${g.toString(16)}, ${b.toString(16)}, ${a.toString(16)})`;

export const useSimpleQuery = <Data>(query: DocumentNode, variables?: any) =>
	nullToUndefined(useQuery<Data>(query, {variables}));
