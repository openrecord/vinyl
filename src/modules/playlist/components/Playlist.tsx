import * as React from 'react';
import styled from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';

import {device} from '../../../styles/utilities/device';
import {toRGBString} from '../../common/utils';
import ControlsContainer from '../../controls/components/ControlsContainer';
import PlayerContainer from '../../player/components/PlayerContainer';
import QueueContainer from '../../queue/components/QueueContainer';
import SearchContainer from '../../search/components/SearchContainer';
import {$Color} from '../../store';
import CollectionInfo from './CollectionInfo';
import Record from './Record';

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
					<VelocityTransitionGroup
						enter={{animation: 'fadeIn', display: 'flex'}}
						leave={{animation: 'fadeOut', display: 'flex'}}
						runOnMount
					>
						<Header>
							<Record />
							<CollectionInfo
								live={live}
								toggleSearch={toggleSearch}
								toggleLive={toggleLive}
								trackCount={trackCount}
								playlist={playlist}
								isOpen={isOpen}
							/>
						</Header>
					</VelocityTransitionGroup>
					<PlayerContainer />
					<ControlsContainer />
					<SearchContainer />
					<SearchResultsTarget id="search-results-target">
						{trackCount === 0 && (
							<EmptyCollection>
								<h2>This collection is currently empty</h2>
								<h4>Click 'Add Song' button to start collecting</h4>
							</EmptyCollection>
						)}
						<QueueContainer />
					</SearchResultsTarget>
				</StyledPlaylist>
			</StyledPlaylistBackground>
		);
	}
}

const StyledPlaylistBackground = styled.div`
	transition: background-color 0.5s linear;
	height: 100vh;
`;

const SearchResultsTarget = styled.div`
	position: relative;
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
	border-bottom: 1px solid rgba(40, 40, 40, 1);
	padding: 0 0 1rem 0;
	display: none !important;
	flex-direction: row;
	align-items: stretch;

	@media ${device.small} {
		padding: 0;
		width: 100%;
	}
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
