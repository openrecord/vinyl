import * as React from 'react';
import styled from 'styled-components';

export default function AddSong({onClick, isSearchOpen}) {
	return (
		<StyledAddSong onClick={onClick} data-id="show-hide-search">
			{isSearchOpen ? (
				'Hide Search'
			) : (
				<>
					Add Song
					<span> +</span>
				</>
			)}
		</StyledAddSong>
	);
}

export const StyledAddSong = styled.button`
	background: transparent;
	border: 0.125rem solid #9c4d9d;
	border-radius: 0.25rem;
	color: rgba(255, 255, 255, 0.9);
	cursor: pointer;
	font-size: 0.875rem;
	line-height: 1rem;
	outline: none;
	padding: 0.25rem 0.5rem;
	transition: all 0.1s;
	max-width: 6.5rem;

	span {
		font-size: 1rem;
		line-height: 0.875rem;
	}

	&:hover {
		color: rgba(255, 255, 255, 1);
		background: #9c4d9d;
	}
`;
