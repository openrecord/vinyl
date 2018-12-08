import Vibrant from 'node-vibrant';
import * as React from 'react';
import {mod, set} from 'shades';

import {toggleOr} from '../common/utils';
import {$Track} from '../search/components/types';
import {$SetState, $WithDefaultActions} from './setters';

function useFunctionalState<S>(initialState: S): [S, $SetState<S>] {
	const [state, setState] = React.useState(initialState);
	return [state, updater => setState(updater(state))];
}

const addDefaultActions = <S extends object>(setState: $SetState<S>) => <A extends object>(
	actions: A
) => ({
	...actions,
	setter: <Key extends keyof S>(key: Key) => (value: S[Key]) => setState(set(key)(value)),
	toggle: <Key extends keyof S>(key: Key) => (value?: boolean) =>
		setState(mod(key)(toggleOr(value)))
});

const DEFAULT_BG: $Color = {
	r: 25,
	g: 25,
	b: 25
};

export interface $Player {
	currentlyPlaying: $Track | undefined;
	playing: boolean;
	expanded: boolean;
	played: number;
	duration: number;
	live: boolean;
	color: $Color;
}

export interface $Queue {
	tracks: $Track[];
	isOpen: boolean;
}

export interface $Search {
	query: string;
	isOpen: boolean;
}

export interface $State {
	player: $Player;
	queue: $Queue;
	search: $Search;
}

const initialState: $State = {
	player: {
		currentlyPlaying: undefined,
		playing: true,
		expanded: true,
		played: 0,
		duration: 0,
		live: true,
		color: DEFAULT_BG
	},
	queue: {
		tracks: [],
		isOpen: false
	},
	search: {
		query: '',
		isOpen: false
	}
};

export interface $Color {
	r: number;
	g: number;
	b: number;
	a?: number;
}

interface $Actions {
	player: {};
	search: {};
	queue: {};
}

interface $Store {
	state: $State;
	actions: $Actions & $WithDefaultActions<$State>;
}

const Store = React.createContext<$Store>({
	state: initialState,
	// @ts-ignore
	actions: null
});

export function useStore(): $Store {
	return React.useContext(Store);
}

interface $Props {
	children: React.ReactNode;
}

export default function StoreProvider({children}: $Props) {
	const [player, setPlayer] = useFunctionalState(initialState.player);
	const [search, setSearch] = useFunctionalState(initialState.search);
	const [queue, setQueue] = useFunctionalState(initialState.queue);

	useUpdateColorForTrack(player.currentlyPlaying, setPlayer);

	const state: $State = {
		player,
		search,
		queue
	};

	const actions: $Actions = {
		player: addDefaultActions(setPlayer)({}),
		search: addDefaultActions(setSearch)({}),
		queue: addDefaultActions(setQueue)({})
	};

	return <Store.Provider value={{state, actions}}>{children}</Store.Provider>;
}

function useUpdateColorForTrack(
	currentlyPlaying: $Track | undefined,
	setPlayer: $SetState<$Player>
) {
	React.useEffect(
		() => {
			if (currentlyPlaying) {
				const thumb = document.querySelector(
					`img[data-id="${currentlyPlaying.info.id}"]`
				) as HTMLImageElement;

				new Vibrant(thumb)
					.getPalette()
					.then(({Muted: {r, g, b}}: {Muted: $Color}) => setPlayer(set('color')({r, g, b})));
			} else {
				setPlayer(set('color')(DEFAULT_BG));
			}
		},
		[currentlyPlaying]
	);
}
