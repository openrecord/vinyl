import * as React from 'react';
import {VelocityTransitionGroup} from 'velocity-react';
import styled from 'styled-components';

import {has} from 'shades';

import {device} from '../../../styles/utilities/device';
import ArrowNavigation from '../../common/components/ArrowNavigation';
import Track from '../../search/components/Track';
import * as animations from '../../common/animations';

export default function Queue({
	tracks,
	updatePlaying,
	togglePlaying,
	currentlyPlayingId,
	playing,
	deleteTrack
}) {
	const isCurrentSong = has({id: currentlyPlayingId});

	return (
		<QueueList>
			<ArrowNavigation priority={ArrowNavigation.PRIORITY_MAP.QUEUE} childIsWrapped>
				<VelocityTransitionGroup
					enter={{
						animation: animations.rotate3d.in,
						display: 'flex',
						stagger: 90,
						duration: 850
					}}
					leave={{animation: animations.rotate3d.out, display: 'flex'}}
					runOnMount
				>
					{tracks.map(track => (
						<Track
							{...track.info}
							key={track.id}
							onClick={isCurrentSong(track) ? togglePlaying : () => updatePlaying(track)}
							deleteTrack={() => deleteTrack(track)}
							playing={playing}
							isCurrentSong={isCurrentSong(track)}
							highRes
						/>
					))}
				</VelocityTransitionGroup>
			</ArrowNavigation>
		</QueueList>
	);
}

const QueueList = styled.div`
	margin-bottom: 3.5rem;
	overflow: hidden;
	overflow-y: scroll;
	height: calc(100vh - 9.375rem);

	@media ${device.small} {
		margin-bottom: 10.25rem;
	}

	::-webkit-scrollbar {
		display: none;
	}
`;
