import React from 'react';
import styled from 'styled-components';
import Search from '../../search/SearchContainer';
import YoutubeResult from '../../search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

var queue = {},
	filter = {};

export default function Queue({isOpen, queue, toggleOpen, isExpand, toggleExpand, isRecent, toggleRecent}) {
	if (isExpand) {
		queue.expanded = 'expanded';
		queue.button = 'Back →';
	} else {
		queue.expanded = '';
		queue.button = 'Add Song';
	}
	if (isRecent) {
		filter.button = 'Recently Added';
		filter.dropdown = 'Queue';
	} else {
		filter.button = 'Queue';
		filter.dropdown = 'Recently Added';
	}
	if (isOpen) {
		return (
			<Positioning>
				<QueueOuter className={queue.expanded}>
					<div className="queue-info">
						<div className="queue-filter">
							<h4>🎵</h4>
							<button className="filter-switch">{filter.button}</button>
							<div className="filter-dropdown">
								<span onClick={toggleRecent}>{filter.dropdown}</span>
							</div>
						</div>
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

		.search{
			display: block;
		}

		.queue-info{
			border-bottom: 0;
			display: block;
			max-width: 56.25rem;
			margin: 3rem auto 0 auto;
			position: relative;
			
			.queue-filter{
				margin: 0.5rem 0;
			}

			.add-expand{
				margin: 0.5rem 0;
			}
		}

		.queue-inner{
			height: calc(100% - 9.6rem);
			margin: 0 auto;
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

		.queue-filter{
			display: inline-block;
			position: relative;
			margin: 0.5rem 1rem;
			z-index: 22;

			&:hover {
				.filter-switch {
					background: #f2f2f2;
				}
				.filter-dropdown {
					display: inline-block;
				}
			}

			h4 {
				display: inline-block;
			}

			.filter-switch {
				border: 0;
				cursor: pointer;
				display: inline-block;
				font-size: 1rem;
				outline: none;
				left: -0.25rem;
				padding: 0.5rem 0.5rem 0.5rem 0.5rem;
				position: relative;

				&:hover {
					background: #e6e6e6;
				}
			}

			.filter-dropdown {
				background: #f2f2f2;
				display: none;
				position: absolute;
				left: 1.075rem;
				top: 2.175rem;
				span {
					display: block;
					cursor: pointer;
					padding: 0.5rem;
					white-space: nowrap;

					&:hover {
						background: #e6e6e6;
					}
				}
			}
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
			padding: 0.5rem;
			position: relative;
			margin: 0.5rem;
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
	z-index: 1;
`;
