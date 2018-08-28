import React from 'react';
import styled from 'styled-components';

import queue_img from './images/queue.svg';

export default function QueueComponent(props) {
	return <QueueContainer />;
}

class QueueContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			queueOpen: false
		};
	}

	toggleQueue = () => {
		this.setState({queueOpen: !this.state.queueOpen});
	};

	render() {
		var queue = {};
		if (this.state.queueOpen) {
			queue.open = ' open';
		} else {
			queue.open = '';
		}
		return (
			<QueueHolder className={queue.open}>
				<div className="queue-list">
					<QueueItem>
						<div className="item-image" />
						<div className="item-info">
							<h4>Song Title</h4>
						</div>
					</QueueItem>
				</div>
				<QueueButton onClick={this.toggleQueue}>
					<img src={queue_img} />
					<div className="queue-x" />
				</QueueButton>
			</QueueHolder>
		);
	}
}

const QueueHolder = styled.div`
	display: inline-block;
	position: absolute;
	right: 42px;
	z-index: 10;

	&.open {
		.queue-list {
			display: inline-block;
		}
		img {
			opacity: 0;
		}
		.queue-x {
			opacity: 1;
		}
	}

	.queue-list {
		background: rgba(255, 255, 255, 0.9);
		bottom: -24px;
		display: none;
		height: 600px;
		position: absolute;
		right: -24px;
		min-width: 320px;
		width: 25%;
		z-index: 1;
	}
`;

const QueueItem = styled.div`
	background: white;
	box-sizing: border-box;
	display: block;
	padding: 8px;
	width: 100%;

	.item-image {
		background: #5ab9d3;
		display: inline-block;
		height: 32px;
		width: 32px;
	}
	.item-info {
		display: inline-block;
		position: relative;
		margin-left: 8px;
		vertical-align: top;
	}
`;

const QueueButton = styled.button`
	background: white;
	border-radius: 50%;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	display: inline-block;
	height: 64px;
	margin-top: 16px;
	outline: none;
	position: relative;
	width: 64px;
	z-index: 2;

	image {
		height: 20px;
		width: 20px;
		opacity: 1;
		transform: transition(all 0.1s);
	}

	.queue-x {
		height: 20px;
		left: 50%;
		opacity: 0;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		transform: transition(all 0.1s);
		width: 20px;

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
