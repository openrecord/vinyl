import React from 'react';
import styled from 'styled-components';

import YoutubeResult from '../../uniplayer/Search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

export default function Queue({isOpen, queue, toggleOpen}) {
	if (isOpen) {
		return (
			<Positioning>
				<QueueList>
					{queue.map(track => (
						<YoutubeResult result={track.content} key={track.id} onClick={console.log} />
					))}

					<QueueButton onClick={toggleOpen} className="open">
						<img src={x_img} />
					</QueueButton>
				</QueueList>
			</Positioning>
		);
	}
	return (
		<Positioning>
			<QueueButton onClick={toggleOpen}>
				<img src={queue_img} />
			</QueueButton>
		</Positioning>
	);
}

const Positioning = styled.div`
	position: absolute;
	bottom: 0;
	right: 2.625rem;
	z-index: 10;
`;

const QueueList = styled.div`
	background: rgba(255, 255, 255, 0.9);
	min-height: 37.5rem;
	width: 20rem;
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

	&.open {
		position: absolute;
		bottom: 0;
		right: 0rem;
	}
`;
