import * as _ from 'lodash';
import Vibrant from 'node-vibrant';
import {Palette} from 'node-vibrant/lib/color';
import * as React from 'react';
import {mod, set} from 'shades';

import {toggleOr} from '../common/utils';
import {$Track} from '../search/components/types';
import {$SetState, $WithDefaultActions} from './setters';

const addDefaultActions = <S extends object>(setState: $SetState<S>) => <A extends object>(
  actions: A
) => ({
  ...actions,
  setter: <Key extends (keyof S) & string>(key: Key) => (value: S[Key]) =>
    setState(set(key)(value)),
  toggle: <Key extends (keyof S) & string>(key: Key) => (value?: boolean) =>
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
  isActive: boolean;
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
    color: DEFAULT_BG,
    isActive: true
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

// @ts-ignore
const Store = React.createContext<$Store>();

export function useStore(): $Store {
  return React.useContext(Store);
}

interface $Props {
  children: React.ReactNode;
}

export default function StoreProvider({children}: $Props) {
  const [search, setSearch] = React.useState(initialState.search);
  const [queue, setQueue] = React.useState(initialState.queue);
  const [player, setPlayer] = React.useState(initialState.player);

  useUpdateColorForTrack(player.currentlyPlaying, setPlayer);
  useUpdateIsActive(setPlayer);

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
          .then(getSwatch)
          .then(({r, g, b}: $Color) => setPlayer(set('color')({r, g, b})));
      } else {
        setPlayer(set('color')(DEFAULT_BG));
      }
    },
    [currentlyPlaying]
  );
}

const getSwatch = (palette: Palette) =>
  palette.Muted ||
  palette.DarkMuted ||
  palette.LightMuted ||
  palette.LightVibrant ||
  palette.DarkVibrant ||
  palette.Vibrant ||
  DEFAULT_BG;

function useUpdateIsActive(setPlayer: $SetState<$Player>) {
  const pid = React.useRef(0);

  const setTimer = () => {
    pid.current = window.setTimeout(() => setPlayer(set('isActive')(false)), 3000);
  };

  const reset = React.useRef(
    _.throttle(() => {
      setPlayer(set('isActive')(true));
      clearTimeout(pid.current);
      setTimer();
    }, 250)
  );

  React.useEffect(() => {
    setTimer();
    document.addEventListener('mousemove', reset.current);
    document.addEventListener('keypress', reset.current);

    return () => {
      document.removeEventListener('mousemove', reset.current);
      document.removeEventListener('keypress', reset.current);
    };
  }, []);
}
