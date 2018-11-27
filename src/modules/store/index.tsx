import * as React from 'react';
import {map, mod, set} from 'shades';

import {toggleOr} from '../common/utils';
import {$Track} from '../search/components/types';

const initialState: $State = {
	player: {
		currentlyPlaying: undefined,
		playing: true,
		expanded: false,
		played: 0,
		duration: 0,
		live: false
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

type $WithSetters<S> = S & {
	toggle: $Toggler<S>;
	setter: $Setter<S>;
};

interface $Toggler<T> {
	(key: keyof T): (value?: boolean) => void;
}

interface $Setter<T> {
	<Key extends keyof T>(key: Key): (value: T[Key]) => void;
}

type $WithDefaultActions<State> = {
	[P in keyof State]: State[P] & {
		toggle: $Toggler<State[P]>;
		setter: $Setter<State[P]>;
	}
};

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

	render() {
		const {
			state,
			actions,
			props: {children}
		} = this;
		const {Provider} = Store;
		return <Provider value={{state, actions}}>{children}</Provider>;
	}
}
