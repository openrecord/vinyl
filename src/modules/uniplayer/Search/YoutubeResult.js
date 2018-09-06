import styled from 'styled-components';
import React from 'react';

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
			<ImageHolder>
				<img src={url} height={height * 0.5} width={width * 0.5} />
			</ImageHolder>
			{title}
		</StyledResult>
	);
}

const StyledResult = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 0.75rem 1rem;
	transition: background-color 0.3s linear;

	&:hover {
		background-color: #e5e5e5;
	}
`;

const ImageHolder = styled.div`
	position: relative;
	height: 4.125rem;
	overflow: hidden;
	margin-right: 0.75rem;
	width: 7.5rem;

	img {
		height: 5.625rem;
		position: absolute;
		top: -0.75rem;
		width: 7.5rem;
	}
`;
