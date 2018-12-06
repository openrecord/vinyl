export type $WithSetters<S> = S & {
	toggle: $Toggler<S>;
	setter: $Setter<S>;
};

interface $Toggler<T> {
	(key: keyof T): (value?: boolean) => void;
}

interface $Setter<T> {
	<Key extends keyof T>(key: Key): (value: T[Key]) => void;
}

export type $WithDefaultActions<State> = {
	[P in keyof State]: State[P] & {
		toggle: $Toggler<State[P]>;
		setter: $Setter<State[P]>;
	}
};

export type $SetState<S> = (updater: (s: S) => S) => void;
