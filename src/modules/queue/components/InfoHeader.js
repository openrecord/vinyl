import React from 'react';
import styled from 'styled-components';

export default function InfoHeader({isSearchOpen, toggleSearch}) {
	return (
		<StyledInfoHeader>
			<h3>🎵 Collection</h3>
			<button className="search-btn" onClick={toggleSearch}>
				{isSearchOpen ? 'Back →' : 'Add Song'}
			</button>
		</StyledInfoHeader>
	);
}

const StyledInfoHeader = styled.div`
	background: white;
	border-bottom: 1px solid #f2f2f2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	padding: 0.5rem;
	width: 19rem;
	z-index: 1;

	.filter {
		border: none;
		padding: 0.5rem;
		font-size: 1rem;
		cursor: pointer;
		outline: none;
	}

	.search-btn {
		background: #d9d9d9;
		border: 0;
		border-radius: 0.25rem;
		color: white;
		cursor: pointer;
		font-size: 1rem;
		padding: 0.5rem;
		outline: none;
	}
`;
