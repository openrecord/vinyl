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
	background: rgba(0, 0, 0, 0.8);
	position: relative;
	transition: all 0.1s;
	width: 0;

	${({white}) =>
		white &&
		css`
			width: 25rem;
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
	bottom: 1rem;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	height: 4rem;
	left: -5rem;
	outline: none;
	position: absolute;
	width: 4rem;
`;
