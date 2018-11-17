import * as React from 'react';
import MediaQuery from 'react-responsive';
import {toast} from 'react-toastify';
import styled from 'styled-components';

import {device, size} from '../../../../styles/utilities/device';
import Toast from '../../../common/components/Toast';
import {ifElse} from '../../../common/utils';
import AddSong from './AddSong';
import Button from './Button';

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
			<h6>NOW PLAYING</h6>
			<Button active={live} onClick={() => toggleLive()}>
				*LIVE
			</Button>
			<AddSong onClick={toggleSearch} isSearchOpen={isSearchOpen} />
		</StyledCollectionInfo>
	);

	const mobile = (
		<StyledCollectionInfo>
			<Button active={live} onClick={() => toggleLive()}>
				*LIVE
			</Button>

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

	h6 {
		color: #3d3d3d;
		margin-left: 0.75rem;
	}

	//REMOVE THIS CODE
	${Button} {
		right: 0;
		position: absolute;
	}
`;
