import * as React from 'react';

import WithPlaylistId from '../components/WithPlaylistId';
import PlayNthNextFromQueue from './PlayNthNextFromQueue';

interface $Props {
	children(mutation: (inp: {}) => any): React.ReactNode;
}

const changer = (n: number) => ({children, ...props}: $Props) => (
	<WithPlaylistId>
		{(playlist: string) => (
			<PlayNthNextFromQueue variables={{playlist, n}} {...props}>
				{children}
			</PlayNthNextFromQueue>
		)}
	</WithPlaylistId>
);

export const PlayNext = changer(1);
export const PlayPrev = changer(-1);
