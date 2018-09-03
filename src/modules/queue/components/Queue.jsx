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
	} else {
		queue.expanded = '';
	}
	if (isOpen) {
		return (
			<Positioning>
				<QueueOuter className={queue.expanded}>
					<div className="queue-inner">
						<div className="queue-info">
							<h3>Up Next</h3>
							<button className="add-expand" onClick={toggleExpand}>
								Add Song
							</button>
						</div>
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
	bottom: 1rem;
	height: 85%;
	min-width: 18.75rem;
	right: 1rem;
	width: 33%;

	&.expanded {
		.queue-inner{

			queue-info{
				.add-expand{
					background: red;
				}
			}
			
	
			.search{
				display: block;
			}
		}
	}

	.queue-inner {
		margin: 0 auto;
		max-width: 56.25rem;
		position: relative;

		.queue-info{
			border-bottom: 1px solid #f2f2f2;

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
