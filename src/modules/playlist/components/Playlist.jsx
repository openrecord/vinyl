import React from 'react';
import styled from 'styled-components';

import SearchContainer from '../../search/components/SearchContainer';
import QueueContainer from '../../queue/components/QueueContainer';

export default function Playlist({playlist, isSearchOpen, toggleSearch, trackCount}) {
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
					<h4>Search for a song on YouTube or Soundcloud</h4>
				) : (
					<h4>
						{trackCount} track
						{trackCount !== 1 && 's'}
					</h4>
				)}
			</Header>
			{isSearchOpen && <SearchContainer />}
			<QueueContainer />
		</StyledPlaylist>
	);
}

const StyledPlaylist = styled.div`
	display: block;
	left: 50%;
	max-width: 75rem;
	padding-top: 4rem;
	position: relative;
	transform: translateX(-50%);
	width: 80%;
`;

const Header = styled.div`
	border-bottom: 1px solid rgba(40, 40, 40, 1);
	padding: 0 0 1rem 0;
	display: flex;
	flex-direction: row;
	align-items: stretch;

	h4 {
		color: rgba(98, 98, 98, 1);
		margin-left: auto;
		margin-top: auto;
	}
`;

const CollectionRecord = styled.div`
	background: rgba(255, 255, 255, 0.01);
	border-radius: 50%;
	border: 1px solid rgba(150, 150, 150, 1);
	height: 7rem;
	margin-right: 1rem;
	position: relative;
	transition: all 0.1s;
	width: 7rem;

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
	}
`;

const CollectionInfo = styled.div`
	display: flex;
	flex-direction: column;

	h5 {
		color: rgba(60, 60, 60, 1);
		margin-bottom: 0.25rem;
	}

	h1 {
		color: rgba(255, 255, 255, 1);
	}
`;

const AddSong = styled.button`
	background: transparent
	border: 0.125rem solid #9c4d9d;
	border-radius: 0.25rem;
	color: rgba(255,255,255,0.9);
	cursor: pointer;
	font-size: 0.875rem;
	line-height: 1rem;
	padding: 0.25rem 0.5rem;
	transition: all 0.1s;
	margin-top: auto;

	span{
		font-size: 1rem;
		line-height: 0.875rem;
	}

	&:hover{
		color: rgba(255,255,255,1);
		background: #9c4d9d;
	}
`;
