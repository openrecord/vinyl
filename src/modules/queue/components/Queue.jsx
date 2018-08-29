import React from 'react';
import styled from 'styled-components';

import queue_img from '../images/queue.svg';

export default class QueueContainer extends React.Component {
	render() {
		return (
			<QueueHolder>
				<div className="queue-list">
					<QueueItem>
						<div className="item-image" />
						<div className="item-info">
							<h4>Song Title</h4>
						</div>
					</QueueItem>
				</div>
				<QueueButton>
					<img src={queue_img} />
					<div className="queue-x" />
				</QueueButton>
			</QueueHolder>
		);
	}
}

const QueueHolder = styled.div`
	position: absolute;
	bottom: -25%;
	right: 2.625rem;
	z-index: 10;

	.queue-list {
		background: rgba(255, 255, 255, 0.9);
		min-height: 37.5rem;
		min-width: 20rem;
		width: 25%;
		position: relative;
	}
`;

const QueueItem = styled.div`
	background: white;
	box-sizing: border-box;
	padding: 0.5rem;

	.item-image {
		background: #5ab9d3;
		display: inline-block;
		height: 2rem;
		width: 2rem;
	}
	.item-info {
		display: inline-block;
		margin-left: 0.5rem;
		vertical-align: top;
	}
`;

const QueueButton = styled.button`
	background: white;
	border-radius: 50%;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	display: inline-block;
	height: 4rem;
	width: 4rem;
	margin-top: 1rem;
	outline: none;
	position: absolute;
	bottom: 0;
	right: 0;

	image {
		height: 1.25rem;
		width: 1.25rem;
		opacity: 1;
		transform: transition(all 0.1s);
	}

	.queue-x {
		height: 1.25rem;
		left: 50%;
		opacity: 0;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		transform: transition(all 0.1s);
		width: 1.25rem;

		&:before {
			content: '';
			background: black;
			height: 24px;
			position: absolute;
			left: 50%;
			top: -2px;
			width: 2px;
			transform: translateX(-50%) rotate(45deg);
		}
		&:after {
			content: '';
			background: black;
			height: 24px;
			position: absolute;
			left: 50%;
			top: -2px;
			width: 2px;
			transform: translateX(-50%) rotate(-45deg);
		}
	}
`;
