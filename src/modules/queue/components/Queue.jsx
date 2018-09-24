import React from 'react';
import styled from 'styled-components';

import Track from '../../search/components/Track';

export default function Queue({tracks, updatePlaying, currentlyPlayingId, deleteTrack}) {
	return (
		<QueueList>
			{tracks.map(track => (
				<Track
					{...track.info}
					key={track.id}
					onClick={() => updatePlaying(track)}
					deleteTrack={() => deleteTrack(track)}
					playing={currentlyPlayingId === track.id}
					highRes
				/>
			))}
		</QueueList>
	);
}

const QueueList = styled.div`
	margin-bottom: 5rem;
	overflow-y: scroll;
	width: 100%;

	::-webkit-scrollbar {
		display: none;
	}
`;
