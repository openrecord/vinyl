import gql from 'graphql-tag';
import * as React from 'react';
import {OnSubscriptionDataOptions, Subscription} from 'react-apollo';

import adapt from '../../common/components/Adapt';
import TrackFragments from '../../common/fragments/TrackFragments';
import LocalTogglePlaying from '../../common/mutations/LocalTogglePlaying';
import LocalUpdatePlaying from '../../common/mutations/LocalUpdatePlaying';
import {$Track} from '../../search/components/types';

const ON_REMOTE_CONTROL = gql`
	subscription OnRemoteControl($playlist: String!) {
		remoteControl(where: {mutation_in: [CREATED], node: {song: {playlist: {name: $playlist}}}}) {
			node {
				action
				song {
					...AllTrack
				}
			}
		}
	}
	${TrackFragments.all}
`;

interface $SubscriptionData {
	remoteControl: {
		node: {
			action: string;
			song: $Track;
		};
	};
}

const handleRemoteControl = ({
	localTogglePlaying,
	localUpdatePlaying,
	currentlyPlaying,
	live
}: $ComposedProps & {currentlyPlaying: $Track | null; live: boolean}) => ({
	subscriptionData: {data}
}: OnSubscriptionDataOptions<$SubscriptionData>) => {
	if (data && live) {
		switch (data.remoteControl.node.action) {
			case 'PLAY':
				return localTogglePlaying(true);

			case 'PAUSE':
				return localTogglePlaying(false);

			case 'SET':
				if (currentlyPlaying && currentlyPlaying.id === data.remoteControl.node.song.id) {
					return;
				}
				return localUpdatePlaying(data.remoteControl.node.song);
		}
	}
};

interface $Props {
	playlist: string;
	currentlyPlaying: $Track | null;
	live: boolean;
	children(): JSX.Element;
}

const Composed = adapt({
	localTogglePlaying: <LocalTogglePlaying toggle="nowPlaying" />,
	localUpdatePlaying: <LocalUpdatePlaying variable="track" />
});

interface $ComposedProps {
	localTogglePlaying(playing: boolean): void;
	localUpdatePlaying(song: $Track): void;
}

export default ({playlist, currentlyPlaying, live, children}: $Props) => (
	// @ts-ignore: This typing issue will be resolved in another PR I'm working on
	<Composed>
		{({localTogglePlaying, localUpdatePlaying}: $ComposedProps) => (
			<Subscription<$SubscriptionData>
				subscription={ON_REMOTE_CONTROL}
				variables={{playlist}}
				onSubscriptionData={handleRemoteControl({
					live,
					localTogglePlaying,
					localUpdatePlaying,
					currentlyPlaying
				})}
			>
				{children}
			</Subscription>
		)}
	</Composed>
);
