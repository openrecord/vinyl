import styled, {css} from 'styled-components';
import React from 'react';

export default function YoutubeResult({
	onClick,
	search,
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
			<ImageHolder search={search ? search : undefined}>
				<img src={url} height={height * 0.5} width={width * 0.5} />
			</ImageHolder>
			<h4>{title}</h4>
		</StyledResult>
	);
}

const StyledResult = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 0.5rem 0.75rem;
	transition: background-color 0.1s linear;

	&:hover {
		background: rgba(54, 54, 54);
	}

	h4 {
		overflow: hidden;
		color: rgba(255, 255, 255, 0.8);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		transition: color 0.1s linear;
	}
`;

const ImageHolder = styled.div`
	display: inline-block;
	position: relative;
	height: 4.125rem;
	overflow: hidden;
	margin-right: 0.75rem;
	min-width: 7.5rem;

	img {
		height: 5.625rem;
		position: absolute;
		top: -0.75rem;
		width: 7.5rem;
	}

	${({search}) =>
		search &&
		css`
			height: 3.3rem;
			min-width: 6rem;

			img {
				height: 4.5rem;
				top: -0.6rem;
				width: 6rem;
			}
		`};
`;
