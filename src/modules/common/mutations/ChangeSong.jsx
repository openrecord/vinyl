import React from 'react';

import PlayNthNextFromQueue from './PlayNthNextFromQueue';
import WithPlaylistId from '../components/WithPlaylistId';

const changer = n => ({children, ...props}) => (
	<WithPlaylistId>
		{playlist => (
			<PlayNthNextFromQueue variables={{playlist, n}} {...props}>
				{children}
			</PlayNthNextFromQueue>
		)}
	</WithPlaylistId>
);

export const PlayNext = changer(1);
export const PlayPrev = changer(-1);
