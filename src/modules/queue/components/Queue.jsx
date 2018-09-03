import React from 'react';
import styled from 'styled-components';

import YoutubeResult from '../../search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

import Search from '../../search/SearchContainer';
var queue = {};

export default function Queue({isOpen, queue, toggleOpen, isExpand, toggleExpand}) {
	if (isExpand) {
		queue.expanded = 'expanded';
		queue.button = 'Back to Queue';
	} else {
		queue.expanded = '';
		queue.button = 'Add Song';
	}
	if (isOpen) {
		return (
			<Positioning>
				<QueueOuter className={queue.expanded}>
					<div className="queue-info">
						<h3>Music Queue</h3>
						<button className="add-expand" onClick={toggleExpand}>
							{queue.button}
						</button>
						<Search />
					</div>
					<div className="queue-inner">
						{queue.map(track => <YoutubeResult result={track.content} key={track.id} onClick={console.log} />)}
					</div>
					<QueueButton onClick={toggleOpen} className="open">
						<img src={x_img} />
					</QueueButton>
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
	bottom: 1rem;
	height: 85%;
	min-width: 18.75rem;
	overflow: hidden;
	overflow-y: scroll;
	right: 1rem;
	width: 33%;
	transition: all 0.1s;

	&.expanded {
		height: auto;
		left: 1rem;
		top: 1rem;
		overflow-y: hidden;
		width: auto;
		transition: all 0.1s;

		.queue-info{
			border-bottom: 0px;
			display: block;
			max-width: 56.25rem;
			margin: 5rem auto 0 auto;
			position: relative;

			h3{
				display: none;
			}

			.add-expand{
				position: fixed;
				top: 1.5rem;
				right: 1.5rem;
			}

			.search{
				display: block;
			}
		}

		.queue-inner{
			height: calc(100% - 8.938rem);
			margin: 8.938rem auto 0 auto;
			.search-result{
				top: 0;
			}
		}
	}

	.queue-info{
		background: white;
		position: absolute;
		border-bottom: 1px solid #f2f2f2;
		z-index: 1;
		top: 0;
		width: 100%;

		h3{
			display: inline-block;
			padding: 0.25rem;
			margin: 0.5rem;
		}

		.add-expand {
			background: #d9d9d9;
			border: 0;
			border-radius: 0.25rem;
			color: white;
			cursor: pointer;
			float: right;
			font-size: 1rem;
			display; inline-block;
			padding: 0.325rem 0.5rem;
			position: relative;
			margin: 0.6rem 0.5rem;
			outline: none;
			text-align: left;
		}
	}

	.queue-inner {
		margin: 3rem auto 0 auto;
		max-width: 56.25rem;
		position: relative;
		height: calc(100% - 3rem);
		overflow: hidden;
		overflow-y: scroll;		

		.search-result {
			cursor: pointer;
			padding: 1rem;
			position: relative;
	
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
