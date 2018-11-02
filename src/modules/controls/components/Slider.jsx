import ReactSlider from 'rc-slider';
import * as React from 'react';
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
					handleStyle={handleStyle}
				/>
			</Flex1>
			<Duration seconds={duration} />
		</SliderFlex>
	);
}

const handleStyle = {
	background: 'white',
	borderRadius: '50%',
	height: '0.75rem',
	width: '0.75rem',
	position: 'relative',
	transform: 'translate(-50%, -50%) scale(0)',
	top: '-50%',
	transition: 'transform 0.3s linear'
};

const SliderFlex = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;

	.rc-slider-handle:focus {
		outline: 0;
	}

	:hover {
		.rc-slider-track {
			background: rgb(156, 77, 157);
		}

		.rc-slider-handle {
			transform: translate(-50%, -50%) scale(1) !important;
		}
	}
`;

const Flex1 = styled.div`
	flex: 1;
`;

const StyledReactSlider = styled(ReactSlider)`
	background: rgb(80, 80, 80);
	margin: 0.75rem 0;

	.rc-slider-track {
		background: rgba(255, 255, 255, 0.6);
		transition: background-color 0.3s linear;
	}

	&,
	.rc-slider-track {
		height: 0.25rem;
		border-radius: 0.5rem;
	}
`;
