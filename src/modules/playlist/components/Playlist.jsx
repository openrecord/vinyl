import * as React from 'react';
import {VelocityTransitionGroup} from 'velocity-react';
import styled from 'styled-components';

import {device} from '../../../styles/utilities/device';
import CollectionInfo from './CollectionInfo';
import QueueContainer from '../../queue/components/QueueContainer';
import Record from './Record';
import SearchContainer from '../../search/components/SearchContainer';

export default class Playlist extends React.Component {
	componentDidMount() {
		this.props.createPlaylist();
	}

	render() {
		const {playlist, isSearchOpen, toggleSearch, trackCount} = this.props;
		return (
			<StyledPlaylist>
				<VelocityTransitionGroup
					enter={{animation: 'fadeIn', display: 'flex'}}
					leave={{animation: 'fadeOut', display: 'flex'}}
					runOnMount
				>
					<Header>
						<Record />
						<CollectionInfo
							toggleSearch={toggleSearch}
							trackCount={trackCount}
							playlist={playlist}
							isSearchOpen={isSearchOpen}
						/>
					</Header>
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
	margin: 0 auto;
	padding-top: 4rem;
	position: relative;
	width: 80%;
	transition: all 0.1s;

	@media ${device.small} {
		padding-top: 0;
		width: 100%;
	}
`;

const Header = styled.div`
	border-bottom: 1px solid rgba(40, 40, 40, 1);
	padding: 0 0 1rem 0;
	display: flex;
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
