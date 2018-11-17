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

interface $StyledResultProps {
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
				{!search && (
					<PlayBackground>
						<IconContainer>
							{isCurrentSong && <Speaker src={speaker} />}
							<PlayPause play={!playing || !isCurrentSong} />
						</IconContainer>
					</PlayBackground>
				)}
			</ImageHolder>
			<SongInfo>
				<h5>{title}</h5>
				<Group>
					<Source>
						<img src={soundcloud ? scIcon : ytIcon} />
					</Source>
					{search && <AddSong>Add</AddSong>}
					{!search && !!deleteTrack && <Options deleteTrack={deleteTrack} />}
				</Group>
			</SongInfo>
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

const SongInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const Group = styled.div`
	align-items: center;
	display: flex;
	justify-content: flex-end;
	flex-direction: row;
`;

const Source = styled.div`
	img {
		opacity: 0.2;
		align-content: center;
	}
`;

const AddSong = styled.button`
	background: rgb(104, 104, 104);
	border-radius: 1rem;
	box-sizing: content-box;
	font-size: 0.875rem;
	color: white;
	height: 1rem;
	margin: 0 0.5rem 0 0.75rem;
	padding: 0.25rem 0.75rem;
	cursor: pointer;

	&:hover {
		background: #9c4d9d;
	}
`;

const StyledResult = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	cursor: pointer;
	padding: 0.75rem 0.25rem 0.75rem 0.75rem;
	transition: background-color 0.1s linear;

	&.is-current-song,
	:hover {
		background: rgb(32, 32, 32);

		${PlayBackground} {
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
			opacity: 0.5;
		}
	}

	:focus {
		outline: none;
	}

	h5 {
		overflow: hidden;
		color: rgba(255, 255, 255, 0.8);
		display: -webkit-box;
		margin: 0 1rem 0.25rem 0;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		transition: color 0.1s linear;

		@media ${device.small} {
			margin-right: 0.25rem;
		}
	}
`;
