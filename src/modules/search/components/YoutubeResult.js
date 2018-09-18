import styled, {css} from 'styled-components';
import React from 'react';

export default function YoutubeResult({
	onClick,
	highRes,
	search,
	snippet: {
		title,
		description,
		thumbnails: {
			default: {url}
		}
	}
}) {
	return (
		<StyledResult onClick={onClick}>
			<ImageHolder search={search}>
				<img src={url} />
				<PlayBackground />
				{search ? <AddPlus /> : <PlayButton />}
			</ImageHolder>
			<h4>{title}</h4>
		</StyledResult>
	);
}

const StyledResult = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 0.5rem 0.75rem;
	transition: background-color 0.1s linear;

	&:hover {
		background: rgba(54, 54, 54);
		div {
			span {
				opacity: 1;
			}
		}
	}

	h4 {
		overflow: hidden;
		color: rgba(255, 255, 255, 0.8);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		transition: color 0.1s linear;
	}
`;

const ImageHolder = styled.div`
	display: inline-block;
	position: relative;
	height: 4.125rem;
	overflow: hidden;
	margin-right: 0.75rem;
	min-width: 7.5rem;

	img {
		height: 5.625rem;
		position: absolute;
		top: -0.75rem;
		width: 7.5rem;
	}

	${({search}) =>
		search &&
		css`
			height: 3.3rem;
			min-width: 6rem;

			img {
				height: 4.5rem;
				top: -0.6rem;
				width: 6rem;
			}
		`};
`;

const AddPlus = styled.span`
	height: 1.5rem;
	left: 50%;
	opacity: 0;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 1.5rem;

	&:before {
		background: white;
		content: '';
		height: 1.5rem;
		left: 50%;
		position: absolute;
		width: 0.25rem;
		transform: translateX(-50%);
	}

	&:after {
		background: white;
		content: '';
		height: 1.5rem;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%) rotate(90deg);
		width: 0.25rem;
	}
`;

const PlayBackground = styled.span`
	background: rgba(16, 16, 16, 0.7);
	height: 100%;
	position: absolute;
	opacity: 0;
	width: 100%;
	transition: all 0.1s;
`;

const PlayButton = styled.span`
	height: 1.5rem;
	left: 50%;
	opacity: 0;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	transition: all 0.1s;

	box-sizing: border-box;
	border-width: 0.75rem 0 0.75rem 1.25rem;
	border-color: transparent transparent transparent white;
	border-style: solid;
`;
