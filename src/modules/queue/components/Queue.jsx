import React from 'react';
import styled, {css} from 'styled-components';

import Search from '../../uniplayer/Search/SearchContainer';
import YoutubeResult from '../../uniplayer/Search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

export default function Queue({isQueueOpen, isSearchOpen, queue, toggleQueue, toggleSearch}) {
	if (isQueueOpen) {
		return (
			<Sidebar expand className="sidebar">
				<h2>Tracklist</h2>
				<Search />
				<QueueList>{queue.map(track => <YoutubeResult result={track.content} key={track.id} highRes />)}</QueueList>
				<QueueButton onClick={toggleQueue} open>
					<img src={x_img} />
				</QueueButton>
			</Sidebar>
		);
	}
	return (
		<Sidebar className="sidebar">
			<QueueButton onClick={toggleQueue}>
				<OButton />
			</QueueButton>
		</Sidebar>
	);
}

const Sidebar = styled.div`
	background: rgba(29, 29, 29, 0.995);
	position: fixed;
	height: 100%;
	transition: all 0.1s;
	right: 0;
	top: 0;
	width: ${({expand}) => (expand ? '25rem' : '0rem')};

	h2 {
		display block;
		color: #f2f2f2;
		margin: 1.75rem 0.875rem;
	}
`;

const QueueList = styled.div`
	max-height: calc(100% - 8.75rem);
	position: relative;
	overflow: hidden;
	overflow-y: scroll;

	::-webkit-scrollbar {
		display: none;
	}
`;

const QueueButton = styled.button`
	background: rgba(255, 255, 255, 0.01);
	border-radius: 50%;
	border: 2px solid rgba(255, 255, 255, 1);
	top: 0.875rem;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	height: 3.5rem;
	right: 0.875rem;
	outline: none;
	position: fixed;
	opacity: 0.8;
	width: 3.5rem;
	transition: all 0.1s;

	&:hover {
		opacity: 1;

		img {
			opacity: 1;
		}
	}

	img {
		opacity: 0.9;
		position: relative;
		top: 0.0625rem;
		transition: all 0.1s;
		filter: invert(100%);
	}
`;

const OButton = styled.div`
	background: rgba(255, 255, 255, 1);
	border-radius: 50%;
	display: flex;
	align-content: center;
	height: 1.5rem;
	margin: 0 auto;
	width: 1.5rem;

	&::after {
		content: '';
		background: #9c4d9d;
		border-radius: 50%;
		height: 0.25rem;
		width: 0.25rem;
		margin: auto;
	}
`;
