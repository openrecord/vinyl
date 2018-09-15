import React from 'react';
import styled, {css} from 'styled-components';

import Search from '../../uniplayer/Search/SearchContainer';
import YoutubeResult from '../../uniplayer/Search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

export default function Queue({isSearchOpen, queue, toggleSearch}) {
	return (
		<Sidebar expand className="sidebar">
			<h2>Tracklist</h2>
			<Search />
			<QueueList>{queue.map(track => <YoutubeResult result={track.content} key={track.id} highRes />)}</QueueList>
		</Sidebar>
	);
}

const Sidebar = styled.div`
	background: rgba(29, 29, 29, 0.995);
	position: fixed;
	height: 100%;
	transition: all 0.1s;
	right: 0;
	top: 0;
	width: ${({expand}) => (expand ? '25rem' : '0rem')};

	h2 {
		display block;
		color: #f2f2f2;
		margin: 1.75rem 0.875rem;
	}
`;

const QueueList = styled.div`
	max-height: calc(100% - 8.75rem);
	position: relative;
	overflow: hidden;
	overflow-y: scroll;

	::-webkit-scrollbar {
		display: none;
	}
`;
