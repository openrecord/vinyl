import Color from 'color';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import styled, {css} from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';

import {device} from '../../../styles/utilities/device';
import * as animations from '../../common/animations';
import {ifElse} from '../../common/utils';
import zindex from '../../common/zindex';
import {FOOTER_HEIGHT_DESKTOP, FOOTER_HEIGHT_MOBILE} from './constants';
import ExpandButton from './ExpandButton';
import KeyboardControls from './KeyboardControls';
import Slider from './Slider';
import SongControls from './SongControls';

export default function Controls({
	color,
	playing,
	expanded,
	togglePlaying,
	toggleExpanded,
	toggleSearch,
	playNext,
	playPrev,
	played,
	duration,
	currentlyPlaying,
	setPlayed
}) {
	const title = currentlyPlaying && (
		<Title centered={expanded}>{currentlyPlaying.info.title}</Title>
	);

	const controls = (
		<MediaControls>
			<SongControls
				playing={playing}
				togglePlaying={togglePlaying}
				playNext={playNext}
				playPrev={playPrev}
			/>
		</MediaControls>
	);

	const expandButton = expanded && (
		<RightCenter onClick={toggleExpanded}>
			<ExpandButton />
		</RightCenter>
	);

	const desktop = (
		<Footer color={color}>
			<Slider played={played} duration={duration} setPlayed={setPlayed} />
			<Row transparent={expanded}>
				{title}
				{controls}
				{expandButton}
			</Row>
		</Footer>
	);

	const mobile = (
		<Footer color={color}>
			{currentlyPlaying && (
				<Row transparent={expanded} onClick={toggleExpanded}>
					{title}
					<ExpandButton />
				</Row>
			)}
			<Row>{controls}</Row>
		</Footer>
	);

	return (
		<KeyboardControls
			isPlayerOpen={!!currentlyPlaying}
			togglePlaying={togglePlaying}
			toggleExpanded={toggleExpanded}
			toggleSearch={toggleSearch}
		>
			<VelocityTransitionGroup
				enter={{animation: animations.slideUpExpand.in, duration: 400}}
				leave={{animation: animations.slideUpExpand.out}}
			>
				{currentlyPlaying && (
					<MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>
				)}
			</VelocityTransitionGroup>
		</KeyboardControls>
	);
}

const Footer = styled.div`
	background-color: ${props =>
		Color(props.color)
			.rgb()
			.string()};
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: ${zindex('controls')};
	@media ${device.small} {
		height: 9rem;
	}
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	margin: 0.25rem 2rem 1rem 2rem;

	:first-child {
		border-top: none;
	}
`;

const MediaControls = styled.div`
	left: 50%;
	min-width: 40%;
	position: absolute;
	transform: translateX(-50%);

	@media ${device.small} {
		width: 100%;
	}
`;

const Title = styled.h5`
	color: rgb(255, 255, 255);
	max-width: 25%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const RightCenter = styled.div`
	cursor: pointer;

	:hover {
		${ExpandButton} {
			opacity: 1;
		}
	}
`;
