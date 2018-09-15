import React from 'react';
import styled, {css} from 'styled-components';

import Search from '../../uniplayer/Search/SearchContainer';
import YoutubeResult from '../../uniplayer/Search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

export default function Queue({isSearchOpen, queue, toggleSearch}) {
	return (
		<QueueInner expand className="queue">
			<Search />
			<QueueList>{queue.map(track => <YoutubeResult result={track.content} key={track.id} highRes />)}</QueueList>
		</QueueInner>
	);
}

const QueueInner = styled.div`
	display: block;
	height: 100%;
	left: 50%;
	max-width: 75rem;
	position: fixed;
	top: 5.5rem;
	transform: translateX(-50%);
	width: 80%;
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
