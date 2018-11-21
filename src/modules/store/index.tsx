import * as React from 'react';
import { map, set } from 'shades';

import { toggleOr } from '../common/utils';
import { $Track } from '../search/components/types';

const initialState = {
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
		isSearchOpen: false
	}
};

interface $Props {
	children: React.ReactNode;
}

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
		isSearchOpen: boolean;
	};
}

type $Toggler<T> = (key: keyof T) => (value?: boolean) => void;
type $Setter<T> = <Key extends keyof T>(key: Key) => (value: T[Key]) => void;
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

export default class StoreProvider extends React.Component<$Props, $State> {
	addDefaultActions = (actions: object, stateKey: string): any => ({
		...actions,
		setter: (key: string) => (value: any) => {
			// @ts-ignore
			this.setState({[stateKey]: set(key)(value)(this.state[stateKey])});
		},
		toggle: (key: string) => (value?: boolean) => {
			this.setState(
				// @ts-ignore
				{
					[stateKey]: set(key)(toggleOr(value)((this.state as any)[stateKey][key] as boolean))(
						(this.state as any)[stateKey]
					)
				}
			);
		}
	});

	// @ts-ignore
	actions = map(this.addDefaultActions)({
		player: {},
		search: {},
		queue: {}
	}) as $WithDefaultActions<$Actions>;

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
