import {VelocityTransitionGroup} from 'velocity-react';
import MediaQuery from 'react-responsive';
import * as React from 'react';
import styled, {css} from 'styled-components';

import {FOOTER_HEIGHT_DESKTOP, FOOTER_HEIGHT_MOBILE} from './constants';
import {device} from '../../../styles/utilities/device';
import {ifElse} from '../../common/utils';
import ExpandButton from './ExpandButton';
import Slider from './Slider';
import SongControls from './SongControls';
import zindex from '../../common/zindex';
import KeyboardControls from './KeyboardControls';
import * as animations from '../../common/animations';

export default function Controls({
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
		<ControlsHolder>
			<Slider played={played} duration={duration} setPlayed={setPlayed} />
			{title}
			{controls}
			<Row transparent={expanded}>{expandButton}</Row>
		</ControlsHolder>
	);

	const mobile = (
		<ControlsHolder>
			{currentlyPlaying && (
				<Row transparent={expanded} onClick={toggleExpanded}>
					{title}
					<ExpandButton />
				</Row>
			)}
			<Row>{controls}</Row>
		</ControlsHolder>
	);

	return (
		<KeyboardControls
			isPlayerOpen={!!currentlyPlaying}
			togglePlaying={togglePlaying}
			toggleExpanded={toggleExpanded}
			toggleSearch={toggleSearch}
		>
			<ControlsOuter>
				<VelocityTransitionGroup
					enter={{animation: animations.slideUpExpand.in, duration: 300}}
					leave={{animation: animations.slideUpExpand.out}}
				>
					{currentlyPlaying && (
						<MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>
					)}
				</VelocityTransitionGroup>
			</ControlsOuter>
		</KeyboardControls>
	);
}

const ControlsOuter = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
`;

const ControlsHolder = styled.div`
	position: relative;
	width: 100%;
	z-index: ${zindex('controls')};
`;

const Row = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;

	:first-child {
		border-top: none;
	}
`;

const MediaControls = styled.div`
	min-width: 40%;

	@media ${device.small} {
		width: 100%;
	}
`;

const Title = styled.h5`
	color: white;
	position: static;
	font-size: 0.845rem;
	font-size: 1rem;
	text-align: center;
	margin: 1rem 0;
`;

const RightCenter = styled.div`
	cursor: pointer;
	height: 100%;
	position: absolute;
	right: 0;
	margin-right: 0.5rem;

	:hover {
		${ExpandButton} {
			opacity: 1;
		}
	}
`;
