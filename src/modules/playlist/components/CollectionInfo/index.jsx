import MediaQuery from 'react-responsive';
import React from 'react';
import styled from 'styled-components';

import {device, size} from '../../../../styles/utilities/device';
import {ifElse} from '../../../common/utils';
import AddSong, {StyledAddSong} from './AddSong';
import Message, {StyledMessage} from './Message';

export default function CollectionInfo({playlist, toggleSearch, isSearchOpen, trackCount}) {
	const desktop = (
		<StyledCollectionInfo>
			<Stack>
				<h5>COLLECTION</h5>
				<PlaylistName>/{playlist}</PlaylistName>
				<AddSong onClick={toggleSearch} isSearchOpen={isSearchOpen} />
			</Stack>
			<Message isSearchOpen={isSearchOpen} trackCount={trackCount} />
		</StyledCollectionInfo>
	);

	const mobile = (
		<StyledCollectionInfo>
			<PlaylistName>/{playlist}</PlaylistName>
			<Stack>
				<AddSong onClick={toggleSearch} isSearchOpen={isSearchOpen} />
				<Message isSearchOpen={isSearchOpen} trackCount={trackCount} />
			</Stack>
		</StyledCollectionInfo>
	);

	return <MediaQuery maxDeviceWidth={size.medium}>{ifElse(mobile, desktop)}</MediaQuery>;
}

const StyledCollectionInfo = styled.div`
	display: flex;
	justify-content: space-between;
	position: relative;
	width: 100%;

	h5 {
		color: rgba(60, 60, 60, 1);
		margin-bottom: 0.25rem;

		@media ${device.small} {
			display: none;
		}
	}
`;

const PlaylistName = styled.h1`
	color: rgba(255, 255, 255, 1);
	max-width: 15rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	@media ${device.small} {
		margin: auto 0;
		max-width: 8rem;
	}
`;

const Stack = styled.div`
	display: flex;
	flex-direction: column;

	@media ${device.small} {
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		margin: 0.75rem 0.75rem 0.75rem 0;
		width: 100%;

		${StyledMessage} {
			text-align: right;
		}
	}

	${StyledAddSong} {
		margin-top: auto;
		@media ${device.small} {
			margin: 0 0 auto 0;
		}
	}
`;
