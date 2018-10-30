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
			<ImageHolder search={search}>
				{thumbnail ? <Thumbnail src={thumbnail} search={search} /> : <NoArtwork />}
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
			<h4>{title}</h4>
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

interface $ImageHolderProps {
	search: boolean;
}

const ImageHolder = styled.div`
	display: inline-block;
	position: relative;
	height: 4.125rem;
	overflow: hidden;
	margin-right: 0.75rem;
	min-width: 7.5rem;

	@media ${device.small} {
		height: 2.75rem;
		min-width: 5rem;
	}

	${({search}: $ImageHolderProps) =>
		search &&
		css`
			height: 3.3rem;
			min-width: 6rem;

			@media ${device.small} {
				height: 2.75rem;
				min-width: 5rem;
			}

			div {
				height: 3.3rem;
				min-width: 6rem;
				@media ${device.small} {
					height: 2.75rem;
					min-width: 5rem;
				}
			}
		`};
`;

interface $ThumbnailProps {
	search: boolean;
}

const Thumbnail = styled.img`
	height: 5.625rem;
	position: absolute;
	top: -0.75rem;
	width: 7.5rem;

	${({search}: $ThumbnailProps) =>
		search &&
		css`
			height: 4.5rem;
			top: -0.6rem;
			width: 6rem;

			@media ${device.small} {
				height: 3.75rem;
				top: -0.5rem;
				width: 5rem;
			}
		`}

	@media ${device.small} {
		height: 3.75rem;
		top: -0.5rem;
		width: 5rem;
	}
`;

const NoArtwork = styled.div`
	background-image: linear-gradient(135deg, #846170, #e6846e);
	height: 4.125rem;
	min-width: 7.5rem;
	@media ${device.small} {
		height: 2.75rem;
		min-width: 5rem;
	}
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
	padding: 0.5rem 0.75rem;
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

	h4 {
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
