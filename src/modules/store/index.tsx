import Vibrant from 'node-vibrant';
import * as React from 'react';
import {map, mod, set} from 'shades';

import {toggleOr} from '../common/utils';
import {$Track} from '../search/components/types';
import {$WithDefaultActions, $WithSetters} from './setters';

const DEFAULT_BG: $Color = {
	r: 25,
	g: 25,
	b: 25
};

const initialState: $State = {
	player: {
		currentlyPlaying: undefined,
		playing: true,
		expanded: false,
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

interface $State {
	player: {
		currentlyPlaying: $Track | undefined;
		playing: boolean;
		expanded: boolean;
		played: number;
		duration: number;
		live: boolean;
		color: $Color;
	};

	queue: {
		tracks: $Track[];
		isOpen: boolean;
	};

	search: {
		query: string;
		isOpen: boolean;
	};
}

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

export default class StoreProvider extends React.Component<$Props, $State> {
	addDefaultActions = <Key extends keyof $State>(
		actions: $Actions[Key],
		stateKey: Key
	): $WithSetters<$Actions[Key]> => ({
		...actions,
		setter: <InnerKey extends keyof $State[Key]>(key: InnerKey) => (value: $State[Key][InnerKey]) =>
			// @ts-ignore
			this.setState(set(stateKey, key)(value)),
		toggle: <InnerKey extends keyof $State[Key]>(key: InnerKey) => (value?: boolean) => {
			// @ts-ignore
			this.setState(mod<Key, Key2>(stateKey, key)(toggleOr(value)));
		}
	});

	_actions: $Actions = {
		player: {},
		search: {},
		queue: {}
	};

	// @ts-ignore
	actions = map(this.addDefaultActions)(this._actions) as $WithDefaultActions<$Actions>;

	state = initialState;

	async componentDidUpdate(_prevProps: $Props, prevState: $State) {
		if (prevState.player.currentlyPlaying !== this.state.player.currentlyPlaying) {
			const track = this.state.player.currentlyPlaying;
			if (track) {
				const thumb = document.querySelector(`img[data-id="${track.info.id}"]`) as HTMLImageElement;
				const vibrant = new Vibrant(thumb);
				const {
					Muted: {r, g, b}
				} = await vibrant.getPalette();
				this.setState(set('player', 'color')({r, g, b}));
			} else {
				this.setState(set('player', 'color')(DEFAULT_BG));
			}
		}
	}

	render() {
		const {
			state,
			actions,
			props: {children}
		} = this;

		return <Store.Provider value={{state, actions}}>{children}</Store.Provider>;
	}
}
