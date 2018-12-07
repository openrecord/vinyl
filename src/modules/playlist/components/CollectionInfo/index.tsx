import * as React from 'react';
import MediaQuery from 'react-responsive';
import {toast} from 'react-toastify';
import styled from 'styled-components';

import {device, size} from '../../../../styles/utilities/device';
import Toast from '../../../common/components/Toast';
import {ifElse} from '../../../common/utils';
import AddSong from './AddSong';
import Button from './Button';

interface $Props {
	playlist: string;
	isOpen: boolean;
	toggleSearch: (arg?: boolean) => void;
	toggleLive: (arg?: boolean) => void;
	trackCount: number;
	live: boolean;
}

export default function CollectionInfo({
	toggleSearch,
	isOpen,
	trackCount,
	toggleLive,
	live
}: $Props) {
	const desktop = (
		<StyledCollectionInfo>
			<AddSong onClick={toggleSearch} isOpen={isOpen} />
		</StyledCollectionInfo>
	);

	const mobile = (
		<StyledCollectionInfo>
			<AddSong onClick={toggleSearch} isOpen={isOpen} />
		</StyledCollectionInfo>
	);

	return <MediaQuery maxWidth={size.small}>{ifElse(mobile, desktop)}</MediaQuery>;
}

const StyledCollectionInfo = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;
