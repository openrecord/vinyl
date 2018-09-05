import React from 'react';
import styled from 'styled-components';

import InfoHeader from './InfoHeader';
import Positioning from './Positioning';
import Search from '../../uniplayer/Search/SearchContainer';
import YoutubeResult from '../../uniplayer/Search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

export default function Queue({isQueueOpen, isSearchOpen, queue, toggleQueue, toggleSearch}) {
	if (isQueueOpen) {
		return (
			<Positioning isSearchOpen={isSearchOpen}>
				<QueueList>
					<InfoHeader isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
					{isSearchOpen && <Search />}
					{queue.map(track => (
						<YoutubeResult result={track.content} key={track.id} onClick={console.log} />
					))}

					<QueueButton onClick={toggleQueue} className="open">
						<img src={x_img} />
					</QueueButton>
				</QueueList>
			</Positioning>
		);
	}
	return (
		<Positioning>
			<QueueButton onClick={toggleQueue}>
				<img src={queue_img} />
			</QueueButton>
		</Positioning>
	);
}

const QueueList = styled.div`
	background: white;
	min-height: 37.5rem;
	max-width: 56.25rem;
	margin: auto;
	position: relative;
`;

const QueueButton = styled.button`
	background: white;
	border-radius: 50%;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	height: 4rem;
	width: 4rem;
	margin-top: 1rem;
	outline: none;

	position: fixed;
	bottom: 2rem;
	right: 4rem;
`;
