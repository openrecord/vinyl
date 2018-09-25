import styled, {css} from 'styled-components';
import React from 'react';
import classname from 'classnames';
import Options from './Options';

export default function Track({onClick, playing, search, thumbnail, title, deleteTrack}) {
	return (
		<StyledResult onClick={onClick} className={classname({playing})}>
			<ImageHolder className="image-holder" search={search}>
				<img src={thumbnail} />
				<PlayBackground className="play-background" />
				{search ? <AddPlus /> : <PlayButton className="play-button" />}
			</ImageHolder>
			<h4>{title}</h4>
			{!search && <Options deleteTrack={deleteTrack} />}
		</StyledResult>
	);
}

const StyledResult = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 0.5rem 0.75rem;
	transition: background-color 0.1s linear;

	&.playing {
		background: rgba(40, 40, 40);
		.play-background {
			opacity: 1;
		}
		.play-button {
			opacity: 1;
		}
	}

	&:hover {
		background: rgba(40, 40, 40);
		.image-holder {
			span {
				opacity: 1;
			}
		}
		.options {
			opacity: 0.5;
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
`;

const PlayBackground = styled.span`
	background: rgba(16, 16, 16, 0.8);
	height: 100%;
	position: absolute;
	opacity: 0;
	width: 100%;
	transition: all 0.1s;
`;

const PlayButton = styled.span`
	position: absolute;
	top: 50%;
	left: 50%;
	opacity: 0;
	transform: translate(-50%, -50%);
	transition: all 0.1s;

	border-width: 0.75rem 0 0.75rem 1.25rem;
	border-color: transparent transparent transparent white;
	border-style: solid;
`;
