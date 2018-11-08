import gql from 'graphql-tag';
import * as React from 'react';
import {OnSubscriptionDataOptions, Subscription} from 'react-apollo';

import TrackFragments from '../../common/fragments/TrackFragments';
import LocalTogglePlaying from '../../common/mutations/LocalTogglePlaying';
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

type $TogglePlaying = (nowPlaying: boolean) => void;

const handleRemoteControl = (togglePlaying: $TogglePlaying) => ({
	subscriptionData: {data}
}: OnSubscriptionDataOptions<$SubscriptionData>) => {
	if (data) {
		togglePlaying(data.remoteControl.node.action === 'PLAY');
	}
};

interface $Props {
	playlist: string;
	children(): JSX.Element;
}

export default ({playlist, children}: $Props) => (
	// @ts-ignore: This typing issue will be resolved in another PR I'm working on
	<LocalTogglePlaying toggle="nowPlaying">
		{(togglePlaying: $TogglePlaying) => (
			<Subscription<$SubscriptionData>
				subscription={ON_REMOTE_CONTROL}
				variables={{playlist}}
				onSubscriptionData={handleRemoteControl(togglePlaying)}
			>
				{children}
			</Subscription>
		)}
	</LocalTogglePlaying>
);
