import * as React from 'react';
import styled from 'styled-components';

export default function Duration({className, seconds}) {
	return (
		<StyledTime dateTime={`P${Math.round(seconds)}S`} className={className}>
			{format(seconds)}
		</StyledTime>
	);
}

const StyledTime = styled.time`
	color: rgba(255, 255, 255, 0.7);
	display: none;
	font-size: 0.75rem;
	min-width: 2.5rem;
	position: relative;
	text-align: center;
`;

function format(seconds) {
	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes();
	const ss = pad(date.getUTCSeconds());
	if (hh) {
		return `${hh}:${pad(mm)}:${ss}`;
	}
	return `${mm}:${ss}`;
}

function pad(string) {
	return ('0' + string).slice(-2);
}
