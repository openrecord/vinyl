import {createActions} from 'redux-actions';
import {mod, set, map, identity} from 'shades';

export const targetValue = f => ({target: {value}}) => f(value);

export const toQueryString = params =>
	'?' +
	Object.entries(params)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');

/*
Converts a reducer of the form (State, Action) => State into a reducer
of the form Payload => State => State (where Payload is the .payload property
on Action)
All Shades operators are Path => Update => Object => Object so a normal reducer 
with shades would look like:

setSearch :: (State, Action) => State
function setSearch(state, action) {
 return set('search')(action.payload)(state)
}

but a reverse curried version would just be:

setSearch :: Payload => State => State
const setSearch = set('search')
*/
const reverseCurryReducer = reducer =>
	typeof reducer === 'function' ? (state, {payload}) => reducer(payload)(state) : map(reduxReducerToShadesReducer)(reducer);

export const reverseCurryReducers = map(reverseCurryReducers);

/*
Utility to create dumb actions
We very often want to create reducers that simply set a value on the state
This function takes an initialState and generates an object with all the same 
keys as initialState, but mapped to setter actions for that field
This also has provides the corresponding reducers to handle those actions

The first argument is a namespace to prevent different states with the same key
from overriding each other
The return type is 
{
	set: Setter Object,
	setterReducers: Corresponding reducers,
}

USAGE:
const {
	set,
	setterReducers,
} = createSetters('todo-list', {todos: [], todoTitle: 'hello'})

... register setter reducers ...

set.todoTitle('farts')
> { type: 'todo-list/todoTitle', payload: 'farts' }
*/
export const createSetters = (namespace, initialState) => {
	const setter = createActions({
		[namespace]: map(_ => identity)(initialState)
	});

	const setterReducers = mod(namespace)(map((_, field) => reverseCurryReducer(set(field))))(setter);

	return {
		set: setter[namespace],
		setterReducers
	};
};

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
