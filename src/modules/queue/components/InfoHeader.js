import React from 'react';
import styled from 'styled-components';

export default function InputHeader({isSearchOpen, toggleSearch}) {
	return (
		<StyledInputHeader>
			<button className="filter">
				Recently Added
				<div className="dropdown">
					<span>FIXME</span>
				</div>
			</button>
			<button className="search-btn" onClick={toggleSearch}>
				{isSearchOpen ? 'Back →' : 'Add Song'}
			</button>
		</StyledInputHeader>
	);
}

const StyledInputHeader = styled.div`
	border-bottom: 1px solid #f2f2f2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem;

	.filter {
		border: none;
		padding: 0.5rem;
		font-size: 1rem;
		cursor: pointer;
		background: #f2f2f2;
		outline: none;

		.dropdown {
			display: none;
			position: absolute;
		}

		&:hover {
			background: #e6e6e6;
			.dropdown {
				display: block;
			}
		}
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
