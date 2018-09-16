import React from 'react';
import styled, {css} from 'styled-components';

import Search from '../../uniplayer/Search/SearchContainer';
import YoutubeResult from '../../uniplayer/Search/YoutubeResult';
import queue_img from './images/queue.svg';
import x_img from './images/x.svg';

export default function Queue({isSearchOpen, queue, toggleSearch}) {
	return (
		<QueueOuter>
			<QueueInner expand className="queue">
				<QueueHeader>
					<CollectionRecord>
						<span />
					</CollectionRecord>
					<CollectionInfo>
						<h5>COLLECTION</h5>
						<h1>/example</h1>
						<h4>{queue.length} tracks</h4>
					</CollectionInfo>
				</QueueHeader>
				<Search />
				<QueueList>{queue.map(track => <YoutubeResult result={track.content} key={track.id} highRes />)}</QueueList>
			</QueueInner>
		</QueueOuter>
	);
}

const QueueOuter = styled.div`
	background: rgb(25, 25, 25);
	width: 100%;
`;

const QueueInner = styled.div`
	display: block;
	left: 50%;
	max-width: 75rem;
	padding-top: 3rem;
	position: relative;

	transform: translateX(-50%);
	width: 80%;
`;

const QueueList = styled.div`
	max-height: calc(100vh - 18.5rem);
	position: fixed;
	overflow: hidden;
	overflow-y: scroll;

	::-webkit-scrollbar {
		display: none;
	}
`;

const QueueHeader = styled.div`
	margin: 1rem 0;
`;

const CollectionRecord = styled.div`
	background: rgba(255, 255, 255, 0.01);
	border-radius: 50%;
	border: 1px solid rgba(150, 150, 150, 1);
	display: inline-block;
	height: 6rem;
	margin-right: 1rem;
	outline: none;
	position: relative;
	transition: all 0.1s;
	vertical-align: middle;
	width: 6rem;

	span {
		background: transparent;
		border: 1.125rem solid rgba(150, 150, 150, 1);
		border-radius: 50%;
		display: inline-block;
		height: 0.25rem;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 0.25rem;
	}
`;

const CollectionInfo = styled.div`
	display: inline-block;
	height: 6rem;
	position: relative;
	vertical-align: top;

	h5 {
		color: rgba(60, 60, 60, 1);
		margin-bottom: 0.25rem;
	}

	h1 {
		color: rgba(255, 255, 255, 1);
	}

	h4 {
		bottom: 0;
		color: rgba(98, 98, 98, 1);
		position: absolute;
	}
`;
