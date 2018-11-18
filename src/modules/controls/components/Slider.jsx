import ReactSlider from 'rc-slider';
import * as React from 'react';
import styled from 'styled-components';
import zindex from '../../common/zindex';
import Duration from './Duration';

export default function Slider({played, duration, setPlayed}) {
	return (
		<SliderFlex>
			<DurationHolder>
				<Duration seconds={played * duration} />
				<Duration seconds={duration} />
			</DurationHolder>
			<SliderHolder>
				<StyledReactSlider
					min={0}
					max={1}
					value={played}
					step={0.001}
					onChange={setPlayed}
					handleStyle={handleStyle}
				/>
			</SliderHolder>
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
	flex-direction: column;

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

const DurationHolder = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const SliderHolder = styled.div`
	width: 100%;
`;

export const StyledReactSlider = styled(ReactSlider)`
	background: rgba(20, 20, 20, 0);
	border-radius: 0rem !important;
	padding: 0.5rem 0;
	position: relative;

	&:before {
		background: rgba(36, 36, 36, 1);
		content: '';
		height: 0.25rem;
		position: absolute;
		width: 100%;
	}

	.rc-slider-track {
		background: rgba(255, 255, 255, 0.6);
		transition: background-color 0.3s linear;
	}

	&,
	.rc-slider-track {
		height: 0.25rem;
		border-radius: 0;
		position: relative;
		z-index: ${zindex('slider-track')};
	}

	.rc-slider-handle {
		position: relative;
		z-index: ${zindex('slider-handle')};
	}
`;
