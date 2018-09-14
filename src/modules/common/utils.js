import {createActions} from 'redux-actions';
import {mod, set, map, identity} from 'shades';

export const targetValue = f => ({target: {value}}) => f(value);

export const toQueryString = params =>
	'?' +
	Object.entries(params)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');

export const ifNull = value => maybeValue => maybeValue || value;

export const makeMutation = query => reducer => (_, variables, {cache}) => {
	const prev = cache.readQuery({query});

	cache.writeQuery({query, data: reducer(variables)(prev)});
	return null;
};

export function inspect(value) {
	console.log(value);
	return value;
}
