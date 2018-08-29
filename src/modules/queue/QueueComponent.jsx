import React from 'react';
import styled from 'styled-components';

import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

export default class QueueContainer extends React.Component {
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
		if (!this.state.queueOpen) {
			return (
				<Positioning>
					<QueueButton onClick={this.toggleQueue}>
						<img src={queue_img} />
					</QueueButton>
				</Positioning>
			);
		}
		return (
			<Positioning>
				<QueueList>
					<QueueItem>
						<div className="item-image" />
						<div className="item-info">
							<h4>Song Title</h4>
						</div>
					</QueueItem>
					<QueueButton onClick={this.toggleQueue} className="open">
						<img src={x_img} />
					</QueueButton>
				</QueueList>
			</Positioning>
		);
	}
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
	min-width: 20rem;
	width: 25%;
	position: relative;
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
