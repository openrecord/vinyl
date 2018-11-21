import * as React from 'react';
import * as CopyToClipboard from 'react-copy-to-clipboard';
import MediaQuery from 'react-responsive';
import {toast} from 'react-toastify';
import styled from 'styled-components';

import {device, size} from '../../../../styles/utilities/device';
import Toast from '../../../common/components/Toast';
import {ifElse} from '../../../common/utils';
import AddSong from './AddSong';
import Button from './Button';
import Message, {StyledMessage} from './Message';

const link = require('./images/copy-link.svg');

interface $Props {
	playlist: string;
	isOpen: boolean;
	toggleSearch: (arg?: boolean) => void;
	toggleLive: (arg?: boolean) => void;
	trackCount: number;
	live: boolean;
}

export default function CollectionInfo({
	playlist,
	toggleSearch,
	isOpen,
	trackCount,
	toggleLive,
	live
}: $Props) {
	const desktop = (
		<StyledCollectionInfo>
			<Stack>
				<h5>COLLECTION</h5>
				<CopyToClipboard
					onCopy={() => toast(<Toast message="Link copied to clipboard" />)}
					text={'https://openrecord.co/' + playlist}
				>
					<PlaylistLink>
						<PlaylistName>/{playlist}</PlaylistName>
						<img src={link} />
					</PlaylistLink>
				</CopyToClipboard>
				<AddSong onClick={toggleSearch} isOpen={isOpen} />
			</Stack>
			<Stack>
				<Button active={live} onClick={() => toggleLive()}>
					*LIVE
				</Button>
				<Message isOpen={isOpen} trackCount={trackCount} />
			</Stack>
		</StyledCollectionInfo>
	);

	const mobile = (
		<StyledCollectionInfo>
			<CopyToClipboard
				onCopy={() => toast(<Toast message="Link copied to clipboard" />)}
				text={'https://openrecord.co/' + playlist}
			>
				<PlaylistName>/{playlist}</PlaylistName>
			</CopyToClipboard>
			<Stack>
				<Button active={live} onClick={() => toggleLive()}>
					*LIVE
				</Button>
			</Stack>
			<Stack>
				<AddSong onClick={toggleSearch} isOpen={isOpen} />
				<Message isOpen={isOpen} trackCount={trackCount} />
			</Stack>
		</StyledCollectionInfo>
	);

	return <MediaQuery maxWidth={size.small}>{ifElse(mobile, desktop)}</MediaQuery>;
}

const StyledCollectionInfo = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;

	h5 {
		color: rgba(60, 60, 60, 1);
		margin-bottom: 0.25rem;
	}
`;

const PlaylistLink = styled.div`
	align-items: center;
	cursor: pointer;
	display: flex;
	flex-direction: row;

	&:hover {
		img {
			opacity: 1;
		}
	}

	img {
		height: 1rem;
		margin: 0.5rem 0 0 0.625rem;
		opacity: 0.3;
		width: 1rem;
	}
`;

const PlaylistName = styled.h1`
	color: white;
	cursor: pointer;
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
		align-items: flex-end;
		margin: 0.75rem;

		${StyledMessage} {
			text-align: right;
		}
	}

	${Button} {
		margin: auto;
	}
`;
