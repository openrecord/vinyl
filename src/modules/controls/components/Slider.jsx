import React from 'react';
import styled from 'styled-components';
import Duration from './Duration';

export default function Slider({played, duration, setPlayed}) {
	return (
		<SliderContainer>
			<Duration seconds={played * duration} />
			<StyledSlider>
				<ProgressBarBackground>
					<Progress played={played} />
				</ProgressBarBackground>
				<Bar
					type="range"
					min={0}
					max={1}
					step="any"
					value={played}
					onChange={({target: {value}}) => setPlayed(parseFloat(value))}
				/>
				;
			</StyledSlider>
			<Duration seconds={duration} />
		</SliderContainer>
	);
}

const SliderContainer = styled.div`
	display: flex;
	align-items: center;
`;

const ProgressBarBackground = styled.div`
	background: rgb(80, 80, 80);
	border-radius: 0.5rem;
	height: 0.25rem;
	overflow: hidden;
	position: absolute;
	top: 50%;
	width: 100%;
	transform: translateY(-50%);
`;

const Progress = styled.span.attrs({
	style: props => ({right: `calc(100% - ${props.played * 100}%)`})
})`
	background: rgba(255, 255, 255, 0.6);
	border-radius: 0 0.5rem 0.5rem 0;
	height: 0.25rem;
	position: absolute;
	top: 50%;
	width: 100%;
	transform: translateY(-50%);
`;

const Bar = styled.input`
	background: transparent;
	appearance: none;
	cursor: pointer;
	height: 1.5rem;
	margin: 0;
	outline: none;
	position: relative;
	width: 100%;
	transition: all 0.1s;

	::-webkit-slider-thumb {
		appearance: none;
		background: white;
		border-radius: 50%;
		pointer-events: none;
		transition: all 0.1s;
		height: 0;
		width: 0;
	}
`;

const StyledSlider = styled.div`
	height: 1.5rem;
	position: relative;
	transition: all 0.1s;
	width: 100%;

	:hover {
		${Progress} {
			background: rgb(156, 77, 157);
		}

		${Bar} {
			::-webkit-slider-thumb {
				height: 0.75rem;
				width: 0.75rem;
			}
		}
	}
`;
