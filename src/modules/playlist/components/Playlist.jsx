import * as React from 'react';
import styled from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';

import {device} from '../../../styles/utilities/device';
import QueueContainer from '../../queue/components/QueueContainer';
import SearchContainer from '../../search/components/SearchContainer';
import CollectionInfo from './CollectionInfo';

export default class Playlist extends React.Component {
	componentDidMount() {
		this.props.createPlaylist();
	}

	render() {
		const {playlist, isSearchOpen, toggleSearch, toggleLive, trackCount, live} = this.props;
		return (
			<StyledPlaylist>
				<VelocityTransitionGroup
					enter={{animation: 'fadeIn', display: 'flex'}}
					leave={{animation: 'fadeOut', display: 'flex'}}
					runOnMount
				>
					<CollectionInfo
						live={live}
						toggleSearch={toggleSearch}
						toggleLive={toggleLive}
						trackCount={trackCount}
						playlist={playlist}
						isSearchOpen={isSearchOpen}
					/>
				</VelocityTransitionGroup>
				<SearchContainer isSearchOpen={isSearchOpen} />
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
		);
	}
}
const SearchResultsTarget = styled.div`
	position: relative;
`;
const StyledPlaylist = styled.div`
	display: block;
	max-width: 75rem;
	padding: 1.25rem 0.75rem 0.75rem 0.75rem;
	min-width: 22.5rem;
	width: 30%;
	transition: all 0.1s;

	@media ${device.small} {
		padding-top: 0;
		width: 100%;
	}
`;

const Header = styled.div`
	padding: 0 0 1rem 0;
	display: flex;
	flex-direction: row;
	align-items: center;

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
