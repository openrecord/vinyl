import React from 'react';
import styled, {css} from 'styled-components';

import Search from '../../uniplayer/Search/SearchContainer';
import YoutubeResult from '../../uniplayer/Search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

export default function Queue({isQueueOpen, isSearchOpen, queue, toggleQueue, toggleSearch}) {
	if (isQueueOpen) {
		return (
			<Sidebar white>
				<Search />
				<QueueList>{queue.map(track => <YoutubeResult result={track.content} key={track.id} onClick={console.log} />)}</QueueList>
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
	right: 1rem;
	width: 25rem;

	${({white}) =>
		white &&
		css`
			background: white;
			box-shadow: 0 0 0.5rem 1px rgba(0, 0, 0, 0.25);
		`};
`;

const QueueList = styled.div`
	max-height: calc(100% - 3.5rem);
	position: relative;
	overflow: hidden;
	overflow-y: scroll;

	::-webkit-scrollbar {
		display: none;
	}
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
