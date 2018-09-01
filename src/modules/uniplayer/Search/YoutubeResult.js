import styled from 'styled-components';
import React from 'react';

const StyledResult = styled.div`
	display: flex;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.7);
	border-bottom: 1px solid;
	padding: 1rem 0.5rem;
	transition: background-color 0.3s linear;

	&:hover {
		background-color: rgba(253, 237, 83, 0.7);
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
			<img src={url} height={height} width={width} />
			{title}
		</StyledResult>
	);
}
