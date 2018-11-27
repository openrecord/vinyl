import * as React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';

import {device} from '../../../../styles/utilities/device';
import {ifElse} from '../../../common/utils';

interface $Props {
	isOpen: boolean;
	trackCount: number;
}

export default function Message({isOpen, trackCount}: $Props) {
	return isOpen ? (
		<MediaQuery query={device.medium}>
			{ifElse(
				<StyledMessage>Search YouTube and Soundcloud</StyledMessage>,
				<StyledMessage>Search for a song on YouTube or Soundcloud</StyledMessage>
			)}
		</MediaQuery>
	) : (
		<StyledMessage>
			{trackCount} track
			{trackCount !== 1 && 's'}
		</StyledMessage>
	);
}

export const StyledMessage = styled.h4`
	color: rgba(98, 98, 98, 1);
	margin-top: auto;
`;
