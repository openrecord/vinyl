import gql from 'graphql-tag';
import * as React from 'react';
import {Query} from 'react-apollo';

import adapt from '../components/Adapt';
import {nullToUndefined} from '../utils';
import CreateRemoteControl from './CreateRemoteControl';
import LocalTogglePlaying from './LocalTogglePlaying';

const QUERY = gql`
	query TogglePlaying {
		player {
			currentlyPlaying {
				id
			}
			playing
		}
	}
`;
interface $QueryData {
	player: {
		currentlyPlaying?: {
			id: string;
		};
		playing: boolean;
	};
}

interface $Renderer {
	render(data?: $QueryData): React.ReactNode;
}

const Composed = adapt({
	data: ({render}: $Renderer) => (
		<Query<$QueryData> query={QUERY}>{({data}) => render(nullToUndefined(data))}</Query>
	),
	localTogglePlaying: <LocalTogglePlaying toggle="nowPlaying" />,
	createRemoteControl: <CreateRemoteControl simple />
});

interface $ComposedProps {
	data: $QueryData;
	localTogglePlaying(nowPlaying: boolean): void;
	createRemoteControl(vars: {action: string; id: string}): void;
}

interface $Props {
	children?(mutation: (playing?: boolean) => void): React.ReactNode;
}

export default function TogglePlaying({children}: $Props) {
	return (
		<Composed>
			{({
				data: {
					player: {currentlyPlaying: {id} = {id: ''}, playing}
				},
				localTogglePlaying,
				createRemoteControl
			}: $ComposedProps) =>
				children &&
				children(isPlaying => {
					const nowPlaying = typeof isPlaying === 'boolean' ? isPlaying : !playing;
					const action = nowPlaying ? 'PLAY' : 'PAUSE';
					localTogglePlaying(nowPlaying);
					createRemoteControl({action, id});
				})
			}
		</Composed>
	);
}
