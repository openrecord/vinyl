import * as React from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

import Duration from './Duration';

export default function Slider({played, duration, setPlayed}) {
	return (
		<SliderFlex>
			<Duration seconds={played * duration} />
			<Flex1>
				<StyledReactSlider
					min={0}
					max={1}
					value={played}
					step={0.001}
					onChange={setPlayed}
					withBars
				>
					<Handle />
				</StyledReactSlider>
			</Flex1>
			<Duration seconds={duration} />
		</SliderFlex>
	);
}

const Handle = styled.div`
	background: white;
	border-radius: 50%;
	height: 0;
	width: 0;
	transition: all 0.3s linear;
`;

const SliderFlex = styled.div`
	display: flex;
	align-items: center;

	:hover {
		.bar-0 {
			background: rgb(156, 77, 157);
		}

		${Handle} {
			height: 0.75rem;
			width: 0.75rem;
		}
	}
`;

const Flex1 = styled.div`
	flex: 1;
`;

const StyledReactSlider = styled(ReactSlider)`
	background: rgb(80, 80, 80);
	margin: 0.75rem 0;

	/* class that react-slider uses for already-elapsed protion */
	.bar-0 {
		background: rgba(255, 255, 255, 0.6);
		transition: all 0.3s linear;
	}

	&,
	.bar-0 {
		height: 0.25rem;
		border-radius: 0.5rem;
	}

	.handle {
		top: 50%;
		transform: translate(-50%, -50%);
	}
`;
