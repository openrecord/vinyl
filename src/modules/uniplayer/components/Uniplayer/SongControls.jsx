import styled, {css} from 'styled-components';
import React from 'react';

export default function SongControls({playing, playPrev, playNext, togglePlaying}) {
	return (
		<StyledControls>
			<PrevArrow onClick={playPrev} />
			<PlayPause play={playing} onClick={togglePlaying} />
			<NextArrow onClick={playNext} />
		</StyledControls>
	);
}

const StyledControls = styled.div`
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;
`;

const PlayPause = styled.div`
	border: 1px solid white;
	border-radius: 50%;
	cursor: pointer;
	display: inline-block;
	position: relative;
	height: 1rem;
	padding: 0.5rem;
	opacity: 0.8;
	width: 1rem;
	vertical-align: top;

	&:hover {
		opacity: 1;
	}

	${props =>
		props.play
			? css`
					&:before {
						background: white;
						content: '';
						display: inline-block;
						height: 0.875rem;
						margin-left: 0.0625rem;
						margin-right: 0.125rem;
						width: 0.25rem;
					}
					&:after {
						background: white;
						content: '';
						display: inline-block;
						height: 0.875rem;
						margin-left: 0.125rem;
						margin-right: 0.0625rem;
						width: 0.25rem;
					}
			  `
			: css`
					&:before {
						content: '';
						border-bottom: 0.425rem solid transparent;
						border-left: 0.725rem solid white;
						border-top: 0.425rem solid transparent;
						display: inline-block;
						height: 0;
						width: 0;
						transform: translateX(0.1rem);
					}
			  `};
`;

const Arrow = styled.div`
	cursor: pointer;
	display: inline-block;
	height: 0.75rem;
	margin: 0 0.5rem;
	padding: 0.625rem;
	position: relative;
	opacity: 0.6;
	width: 0.75rem;

	&:hover {
		opacity: 1;
	}
`;
const PrevArrow = styled(Arrow)`
	:before {
		background: white;
		content: '';
		display: inline-block;
		height: 0.75rem;
		top: -0.1875rem;
		position: relative;
		width: 0.125rem;
	}
	:after {
		content: '';
		display: inline-block;
		border-bottom: 0.375rem solid transparent;
		border-right: 0.625rem solid white;
		border-top: 0.375rem solid transparent;
		height: 0;
		top: -0.1875rem;
		position: relative;
		width: 0;
	}
`;
const NextArrow = styled(Arrow)`
	:before {
		content: '';
		border-bottom: 0.375rem solid transparent;
		border-left: 0.625rem solid white;
		border-top: 0.375rem solid transparent;
		display: inline-block;
		height: 0;
		top: -0.1875rem;
		position: relative;
		width: 0;
	}
	:after {
		background: white;
		content: '';
		display: inline-block;
		height: 0.75rem;
		top: -0.1875rem;
		position: relative;
		width: 0.125rem;
	}
`;
