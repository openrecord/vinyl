import * as React from 'react';
import styled from 'styled-components';

import {device} from '../../../styles/utilities/device';
import {toRGBString} from '../../common/utils';
import ControlsContainer from '../../controls/components/ControlsContainer';
import PlayerContainer from '../../player/components/PlayerContainer';
import QueueContainer from '../../queue/components/QueueContainer';
import SearchContainer from '../../search/components/SearchContainer';
import {$Color} from '../../store';
import CollectionInfo from './CollectionInfo';
import zindex from '../../common/zindex';

interface $Props {
	color: $Color;
	playlist: string;
	isOpen: boolean;
	trackCount: number;
	live: boolean;
	createPlaylist(): void;
	toggleLive(value?: boolean): void;
	toggleSearch(value?: boolean): void;
}

export default class Playlist extends React.Component<$Props> {
	componentDidMount() {
		this.props.createPlaylist();
	}

	render() {
		const {playlist, color, isOpen, toggleSearch, toggleLive, trackCount, live} = this.props;

		return (
			<StyledPlaylistBackground style={{backgroundColor: toRGBString(color)}}>
				<StyledPlaylist>
					<Header>
						<CollectionInfo
							live={live}
							toggleSearch={toggleSearch}
							toggleLive={toggleLive}
							trackCount={trackCount}
							playlist={playlist}
							isOpen={isOpen}
						/>
					</Header>
					<PlayerContainer />
					<ControlsContainer />
					<SearchContainer />
					<QueueContainer />
				</StyledPlaylist>
			</StyledPlaylistBackground>
		);
	}
}

const StyledPlaylistBackground = styled.div`
	transition: background-color 0.5s linear;
	height: 100vh;
`;

const StyledPlaylist = styled.div`
	display: block;
	margin: 0 auto;
	position: relative;
	width: 100%;
	transition: all 0.1s;

	@media ${device.small} {
		padding-top: 0;
		width: 100%;
	}
`;

const Header = styled.div`
	position absolute;
	width: 100%;
	z-index: ${zindex('header')};
`;

const EmptyCollection = styled.div`
	margin: 2rem auto;
	text-align: center;
	color: white;

	h2 {
		margin-bottom: 1rem;
	}

	h4 {
		color: rgba(98, 98, 98, 1);
	}

	@media ${device.small} {
		margin: 1.5rem auto;

		h2 {
			margin-bottom: 0.75rem;
		}
	}
`;
