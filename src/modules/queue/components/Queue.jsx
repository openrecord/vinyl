import React from 'react';
import styled from 'styled-components';

import Search from '../../search/components/SearchContainer';
import YoutubeResult from '../../search/components/YoutubeResult';

export default function Queue({isSearchOpen, tracks, toggleSearch, updatePlaying}) {
	return (
		<StyledQueue>
			<QueueHeader>
				<CollectionRecord />
				<CollectionInfo>
					<h5>COLLECTION</h5>
					<h1>/example</h1>
					<AddSong onClick={toggleSearch}>
						Add Song
						<span> +</span>
					</AddSong>
				</CollectionInfo>
				{isSearchOpen ? (
					<h4>Search for a song on YouTube or Soundcloud</h4>
				) : (
					<h4>{tracks.length} tracks</h4>
				)}
			</QueueHeader>
			{isSearchOpen && <Search />}
			<QueueList>
				{tracks.map(track => (
					<YoutubeResult
						snippet={track.snippet}
						key={track.id.videoId}
						onClick={() => updatePlaying({variables: {videoId: track.id.videoId}})}
						highRes
					/>
				))}
			</QueueList>
		</StyledQueue>
	);
}

const StyledQueue = styled.div`
	display: block;
	left: 50%;
	max-width: 75rem;
	padding-top: 4rem;
	position: relative;
	transform: translateX(-50%);
	width: 80%;
`;

const QueueList = styled.div`
	overflow: hidden;
	overflow-y: scroll;
	width: 100%;
	max-height: 30rem;

	::-webkit-scrollbar {
		display: none;
	}
`;

const QueueHeader = styled.div`
	border-bottom: 1px solid rgba(40, 40, 40, 1);
	position: relative;
	padding: 0 0 1rem 0;

	h4 {
		bottom: 1rem;
		color: rgba(98, 98, 98, 1);
		position: absolute;
		right: 0;
	}
`;

const CollectionRecord = styled.div`
	background: rgba(255, 255, 255, 0.01);
	border-radius: 50%;
	border: 1px solid rgba(150, 150, 150, 1);
	display: inline-block;
	height: 7rem;
	margin-right: 1rem;
	outline: none;
	position: relative;
	transition: all 0.1s;
	vertical-align: middle;
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
	display: inline-block;
	height: 7rem;
	position: relative;
	vertical-align: top;

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
	bottom: 0;
	color: rgba(255,255,255,0.9);
	cursor: pointer;
	display: inline-block;
	font-size: 0.875rem;
	line-height: 1rem;
	outline: none;
	padding: 0.25rem 0.5rem;
	position: absolute;
	transition: all 0.1s;

	span{
		font-size: 1rem;
		line-height: 0.875rem;
	}

	&:hover{
		color: rgba(255,255,255,1);
		background: #9c4d9d;
	}
`;
