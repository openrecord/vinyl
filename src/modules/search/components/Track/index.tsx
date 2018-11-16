import classname from 'classnames';
import * as React from 'react';
import styled, {css} from 'styled-components';

import {device} from '../../../../styles/utilities/device';
import PlayPause from '../../../common/components/PlayPause';
import {ifEnter} from '../../../common/utils';
import Options from './Options';

const speaker = require('../../../controls/components/images/speaker.svg');
const scIcon = require('../images/soundcloud.svg');
const ytIcon = require('../images/youtube.svg');

interface $Props {
	search: boolean;
	thumbnail: string | null;
	title: string;
	onClick(): any;
	deleteTrack?: () => any;
	playing?: boolean;
	isCurrentSong?: boolean;
	youtube?: boolean;
	soundcloud?: boolean;
}

export default function Track({
	search,
	thumbnail,
	title,
	onClick,
	deleteTrack,
	playing = false,
	isCurrentSong = false,
	soundcloud = false
}: $Props) {
	return (
		<StyledResult
			onClick={onClick}
			className={classname({'is-current-song': isCurrentSong})}
			onKeyPress={ifEnter(onClick)}
			tabIndex={0}
		>
			<ImageHolder>
				{thumbnail ? (
					<Thumbnail src={thumbnail} search={search} soundcloud={soundcloud} />
				) : (
					<NoArtwork />
				)}
				<PlayBackground>
					<IconContainer>
						{search ? (
							<AddPlus />
						) : (
							<>
								{isCurrentSong && <Speaker src={speaker} />}
								<PlayPause play={!playing || !isCurrentSong} />
							</>
						)}
					</IconContainer>
				</PlayBackground>
			</ImageHolder>
			<h5>{title}</h5>
			{search && (
				<SourceIcon>
					<img src={soundcloud ? scIcon : ytIcon} />
				</SourceIcon>
			)}
			{!search && !!deleteTrack && <Options deleteTrack={deleteTrack} />}
		</StyledResult>
	);
}

const IconContainer = styled.span`
	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 40%;
		fill: white;
	}
`;

const PlayBackground = styled.span`
	background: rgba(16, 16, 16, 0.8);
	height: 100%;
	position: absolute;
	opacity: 0;
	width: 100%;
	transition: all 0.1s;
`;

const Speaker = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	height: 1.625rem;
	width: 2rem;
	transform: translate(-50%, -50%);

	@media ${device.small} {
		height: 1.25rem;
		width: 1.5rem;
	}
`;

const AddPlus = styled.span`
	height: 1.5rem;
	left: 50%;
	opacity: 0;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 1.5rem;

	@media ${device.small} {
		height: 1rem;
		width: 1rem;
	}

	&:before {
		background: white;
		content: '';
		height: 1.5rem;
		left: 50%;
		position: absolute;
		width: 0.25rem;
		transform: translateX(-50%);

		@media ${device.small} {
			height: 1rem;
			width: 0.165rem;
		}
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

		@media ${device.small} {
			height: 1rem;
			width: 0.165rem;
		}
	}
`;

const ImageHolder = styled.div`
	display: inline-block;
	position: relative;
	height: 3rem;
	overflow: hidden;
	margin-right: 0.5rem;
	min-width: 3rem;
`;

interface $ThumbnailProps {
	search: boolean;
	soundcloud: boolean;
}

const Thumbnail = styled.img`
	height: 4.2rem;
	position: absolute;
	left: -1.25rem;
	top: -0.6rem;
	width: 5.604rem;
	${({soundcloud}: $ThumbnailProps) =>
		soundcloud &&
		css`
			left: 0;
			top: 0;
			width: 4.2rem;
		`};
`;

const NoArtwork = styled.div`
	background-image: linear-gradient(135deg, #846170, #e6846e);
	height: 3rem;
	width: 3rem;
`;

const SourceIcon = styled.div`
	display: flex;
	margin-left: auto;
	margin-right: 0.5rem;
	opacity: 0.3;
	img {
		align-content: center;
	}
`;

const StyledResult = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 0.75rem;
	transition: background-color 0.1s linear;

	&.is-current-song,
	:hover,
	:focus {
		background: rgb(40, 40, 40);

		${PlayBackground}, ${AddPlus} {
			opacity: 1;
		}
	}

	&.is-current-song:not(:hover) {
		${PlayPause} {
			opacity: 0;
		}
		${Speaker} {
			opacity: 1;
		}
	}

	:hover {
		${PlayPause} {
			opacity: 1;
		}

		${Speaker} {
			opacity: 0;
		}

		.options {
			opacity: 0.8;
		}
	}

	:focus {
		outline: 1px solid rgb(80, 80, 80);
	}

	h5 {
		overflow: hidden;
		color: rgba(255, 255, 255, 0.8);
		display: -webkit-box;
		margin-right: 0.5rem;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		transition: color 0.1s linear;

		@media ${device.small} {
			margin-right: 0.25rem;
		}
	}
`;
