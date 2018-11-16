import * as React from 'react';
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
	isSearchOpen: boolean;
	toggleSearch: (arg?: boolean) => void;
	toggleLive: (arg?: boolean) => void;
	trackCount: number;
	live: boolean;
}

export default function CollectionInfo({
	playlist,
	toggleSearch,
	isSearchOpen,
	trackCount,
	toggleLive,
	live
}: $Props) {
	const desktop = (
		<StyledCollectionInfo>
			<Stack>
				<Button active={live} onClick={() => toggleLive()}>
					*LIVE
				</Button>
			</Stack>
			<AddSong onClick={toggleSearch} isSearchOpen={isSearchOpen} />
		</StyledCollectionInfo>
	);

	const mobile = (
		<StyledCollectionInfo>
			<Stack>
				<Button active={live} onClick={() => toggleLive()}>
					*LIVE
				</Button>
			</Stack>
			<AddSong onClick={toggleSearch} isSearchOpen={isSearchOpen} />
		</StyledCollectionInfo>
	);

	return <MediaQuery maxWidth={size.small}>{ifElse(mobile, desktop)}</MediaQuery>;
}

const StyledCollectionInfo = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	margin-top: 3rem;
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
