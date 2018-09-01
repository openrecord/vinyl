import React from 'react';
import styled from 'styled-components';

import YoutubeResult from '../../search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

import Search from '../../search/SearchContainer';

export default function Queue({isOpen, queue, toggleOpen}) {
	if (isOpen) {
		return (
			<Positioning>
				<QueueOuter>
					<div className="queue-inner">
						<Search />
						{queue.map(track => <YoutubeResult result={track.content} key={track.id} onClick={console.log} />)}

						<QueueButton onClick={toggleOpen} className="open">
							<img src={x_img} />
						</QueueButton>
					</div>
				</QueueOuter>
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
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	pointer-events: none !important;
	top: 0;
	z-index: 10;

	* {
		pointer-events: all;
	}
`;

const QueueOuter = styled.div`
	background: white;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;

	.queue-inner {
		margin: 5rem auto;
		max-width: 56.25rem;
		position: relative;

		.search-result {
			cursor: pointer;
			padding: 1rem;

			&:hover {
				background-color: #e5e5e5;
			}

			.image-holder {
				position: relative;
				height: 66px;
				overflow: hidden;
				margin-right: 0.75rem;
				width: 120px;

				img {
					height: 90px;
					position: absolute;
					top: -12px;
					width: 120px;
				}
			}
		}
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
