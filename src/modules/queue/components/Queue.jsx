import React from 'react';
import styled from 'styled-components';

import InfoHeader from './InfoHeader';
import Search from '../../uniplayer/Search/SearchContainer';
import YoutubeResult from '../../uniplayer/Search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

export default function Queue({isQueueOpen, isSearchOpen, queue, toggleQueue, toggleSearch}) {
	if (isQueueOpen) {
		return (
			<Sidebar style={{backgroundColor: '#ffffff'}}>
				<InfoHeader isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
				<QueueList>
					{isSearchOpen && <Search />}
					{queue.map(track => <YoutubeResult result={track.content} key={track.id} onClick={console.log} />)}
				</QueueList>
				<QueueButton onClick={toggleQueue} className="open">
					<img src={x_img} />
				</QueueButton>
			</Sidebar>
		);
	}
	return (
		<Sidebar>
			<QueueButton onClick={toggleQueue}>
				<img src={queue_img} />
			</QueueButton>
		</Sidebar>
	);
}

const Sidebar = styled.div`
	position: fixed;
	bottom: 1rem;
	height: 80%;
	max-height: 50rem;
	right: 1rem;
	overflow: hidden;
	overflow-y: scroll;
	width: 20rem;
`;

const QueueList = styled.div`
	max-width: 56.25rem;
	margin: 3.125rem auto 0 auto;
	position: relative;
	z-index: 1;
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
	right: 2rem;
`;
