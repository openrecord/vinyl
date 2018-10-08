import React from 'react';
import styled from 'styled-components';
import {device} from '../../../styles/utilities/device';

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
	width: 100%;
	@media ${device.small} {
		margin-bottom: 10.25rem;
		position: relative;
		top: 4.675rem;
	}

	::-webkit-scrollbar {
		display: none;
	}
`;
