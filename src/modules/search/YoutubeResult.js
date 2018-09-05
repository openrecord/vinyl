import styled from 'styled-components';
import React from 'react';

const StyledResult = styled.div`
	display: flex;
	align-items: center;

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
		<StyledResult className="search-result" onClick={onClick}>
			<div className="image-holder">
				<img src={url} height={height} width={width} />
			</div>
			{title}
		</StyledResult>
	);
}
