import * as React from 'react';

import {$Track} from '../../search/components/types';
import CreateRemoteControl from './CreateRemoteControl';
import LocalUpdatePlaying from './LocalUpdatePlaying';

interface $Props {
	children?(mutation: (song: $Track) => void): React.ReactNode;
}

export default function UpdatePlaying({children}: $Props) {
	return (
		// @ts-ignore: type error to be resolved by typed-adopt
		<LocalUpdatePlaying variable="track">
			{(updatePlayingLocal: (song: $Track) => void) => (
				// @ts-ignore: type error to be resolved by typed-adopt
				<CreateRemoteControl variable="id" variables={{action: 'SET'}}>
					{(setSong: (id: string) => void) =>
						children &&
						children(track => {
							updatePlayingLocal(track);
							setSong(track.id);
						})
					}
				</CreateRemoteControl>
			)}
		</LocalUpdatePlaying>
	);
}
