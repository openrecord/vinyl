import {$Track} from '../../search/components/types';
import {useStore} from '../../store';
import useCreateRemoteControl from './CreateRemoteControl';

export default function useUpdatePlaying() {
  const {
    actions: {
      player: {setter}
    }
  } = useStore();

  const createRemoteControl = useCreateRemoteControl();

  return (track: $Track) => {
    setter('currentlyPlaying')(track);
    createRemoteControl({action: 'SET', id: track.id});
  };
}
