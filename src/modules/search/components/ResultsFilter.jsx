import * as React from 'react';
import styled from 'styled-components';
const scIcon = require('./images/soundcloud.svg');
const ytIcon = require('./images/youtube.svg');

export default function ResultsFilter(props) {
	const choices = [
		{name: 'YoutubeResult', icon: ytIcon},
		{name: 'SoundCloudResult', icon: scIcon},
		{name: 'both'}
	];
	return (
		<Filter>
			{choices.map(choice => (
				<Option key={choice.name}>
					<StyledRadio
						type="radio"
						name="filter"
						onClick={props.handleFilter}
						id={choice.name}
						defaultChecked={choice.name === 'both' ? true : false}
					/>
					{choice.icon && <img src={choice.icon} />}
					{choice.name === 'both' && <h5>Both</h5>}
				</Option>
			))}
		</Filter>
	);
}

const Filter = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0.5rem 1rem 0.5rem;
	font-family: 'Haas Reg', Arial, sans-serif;
	background: rgb(25, 25, 25);
	box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.1);
	color: white;
	cursor: pointer;
	img,
	h5 {
		opacity: 0.3;
		transition: 0.4s;
	}
`;

const Option = styled.label`
	display: flex;
	align-items: center;
	padding: 0 0.2rem 0 0.7rem;
	cursor: pointer;
	:hover {
		input {
			opacity: 1;
			background: purple;
		}
	}
`;

const StyledRadio = styled.input`
	appearance: none;
	border-radius: 1.5rem;
	width: 0.7rem;
	height: 0.7rem;
	background: white;
	outline: none;
	opacity: 0.3;
	transition: 0.4s;
	:checked {
		opacity: 1;
		background: purple;
	}
`;
