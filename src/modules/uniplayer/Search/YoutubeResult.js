import styled from 'styled-components';
import React from 'react';

const StyledResult = styled.div`
	display: flex;
	align-items: center;
	padding: 0.75rem 1rem;
	transition: background-color 0.3s linear;

	&:hover {
		background-color: #e5e5e5;
	}

	img {
		margin-right: 0.5rem;
	}
`;

export default function YoutubeResult({
	onClick,
	result: {
		title,
		description,
		thumbnails: {
			default: {url, height, width}
		}
	}
}) {
	return (
		<StyledResult onClick={onClick}>
			<img src={url} height={height * 0.5} width={width * 0.5} />
			{title}
		</StyledResult>
	);
}
