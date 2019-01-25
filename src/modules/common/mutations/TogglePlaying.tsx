import {useStore} from '../../store';
import {toggleOr} from '../utils';
import useCreateRemoteControl from './CreateRemoteControl';

type $TogglePlaying = (isPlaying?: boolean) => void;

export function useTogglePlaying(): $TogglePlaying {
  const {
    state: {
      player: {playing, currentlyPlaying: {id} = {id: ''}}
    },
    actions: {
      player: {toggle}
    }
  } = useStore();
  const createRemoteControl = useCreateRemoteControl();

  return isPlaying => {
    const nowPlaying = toggleOr(isPlaying)(playing);
    const action = nowPlaying ? 'PLAY' : 'PAUSE';
    toggle('playing')(nowPlaying);
    createRemoteControl({action, id});
  };
}
