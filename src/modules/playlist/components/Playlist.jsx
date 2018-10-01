import React from 'react';
import styled from 'styled-components';
import {device} from '../../../styles/utilities/device';

import SearchContainer from '../../search/components/SearchContainer';
import QueueContainer from '../../queue/components/QueueContainer';

export default class Playlist extends React.Component {
	componentDidMount() {
		this.props.createPlaylist();
	}

	render() {
		const {playlist, isSearchOpen, toggleSearch, trackCount} = this.props;
		return (
			<StyledPlaylist>
				<Header>
					<CollectionRecord />
					<CollectionInfo>
						<h5>COLLECTION</h5>
						<h1>/{playlist}</h1>
						<AddSong onClick={toggleSearch} data-id="show-hide-search">
							{isSearchOpen ? (
								'Hide Search'
							) : (
								<>
									Add Song
									<span> +</span>
								</>
							)}
						</AddSong>
					</CollectionInfo>
					{isSearchOpen ? (
						<h4 className="search">Search </h4>
					) : (
						<h4>
							{trackCount} track
							{trackCount !== 1 && 's'}
						</h4>
					)}
				</Header>
				{isSearchOpen && <SearchContainer />}
				{trackCount < 1 && (
					<EmptyCollection className="empty-collection">
						<h2>This collection is currently empty</h2>
						<h4>Click 'Add Song' button to start collecting</h4>
					</EmptyCollection>
				)}
				<QueueContainer />
			</StyledPlaylist>
		);
	}
}

const StyledPlaylist = styled.div`
	display: block;
	left: 50%;
	max-width: 75rem;
	padding-top: 4rem;
	position: relative;
	transform: translateX(-50%);
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
	}

	h4 {
		color: rgba(98, 98, 98, 1);
		margin-left: auto;
		margin-top: auto;
		@media ${device.small} {
			position: absolute;
			right: 0.75rem;
			top: 3rem;
		}

		&.search {
			::after {
				content: 'for a song on YouTube or Soundcloud';
				display: inline-block;
				position: relative;
			}
			@media ${device.medium} {
				::after {
					content: 'YouTube & Soundcloud';
				}
			}
		}
	}
`;

const CollectionRecord = styled.div`
	background: rgba(255, 255, 255, 0.01);
	border-radius: 50%;
	border: 1px solid rgba(150, 150, 150, 1);
	height: 7rem;
	margin-right: 1rem;
	min-width: 7rem;
	position: relative;
	transition: all 0.1s;

	@media ${device.small} {
		display: block;
		height: 3rem;
		margin: 0.75rem 0.5rem;
		min-width: auto;
		width: 3rem;
	}

	::after {
		content: '';
		background: transparent;
		border: 1.25rem solid rgba(150, 150, 150, 1);
		border-radius: 50%;
		display: inline-block;
		height: 0.3125rem;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 0.3125rem;

		@media ${device.small} {
			border: 0.6125rem solid rgba(150, 150, 150, 1);
			height: 0.1875rem;
			width: 0.1875rem;
		}
	}
`;

const CollectionInfo = styled.div`
	display: flex;
	flex-direction: column;
	@media ${device.small} {
		flex-direction: row;
		align-content: center;
		justify-content: space-between;
		width: calc(100% - 4rem);
	}

	h5 {
		color: rgba(60, 60, 60, 1);
		margin-bottom: 0.25rem;

		@media ${device.small} {
			display: none;
		}
	}

	h1 {
		color: rgba(255, 255, 255, 1);
		max-width: 15rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		@media ${device.small} {
			margin: auto 0;
			max-width: 8rem;
		}
	}
`;

const AddSong = styled.button`
	background: transparent
	border: 0.125rem solid #9c4d9d;
	border-radius: 0.25rem;
	color: rgba(255,255,255,0.9);
	cursor: pointer;
	display: inline-block;
	font-size: 0.875rem;
	line-height: 1rem;
	outline: none;
	padding: 0.25rem 0.5rem;
	transition: all 0.1s;
	margin-top: auto;
	max-width: 6.5rem;

	@media ${device.small} {
		align-self: flex-start;
		margin: 0.75rem 0.75rem 0 0;
	}

	span{
		font-size: 1rem;
		line-height: 0.875rem;
	}

	&:hover{
		color: rgba(255,255,255,1);
		background: #9c4d9d;
	}
`;

const EmptyCollection = styled.div`
	margin: 2rem auto;
	text-align: center;
	color: white;
	position: relative;

	h2 {
		margin-bottom: 1rem;
	}

	h4 {
		opacity: 0.5;
	}

	@media ${device.small} {
		margin: 1.5rem auto;
		h2 {
			margin-bottom: 0.75rem;
		}

		h4 {
		}
	}
`;
