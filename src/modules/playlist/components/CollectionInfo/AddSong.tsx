import * as React from 'react';
import styled from 'styled-components';
import Button from './Button';
import zindex from '../../../common/zindex';

interface $Props {
	onClick: () => void;
	isSearchOpen: boolean;
}

export default function AddSong({onClick, isSearchOpen}: $Props) {
	return (
		<AddContainer>
			<Button onClick={onClick} data-id="show-hide-search">
				Add Song
			</Button>
		</AddContainer>
	);
}

const AddContainer = styled.div`
	background: rgba(20, 20, 20, 1);
	bottom: 0;
	height: 4rem;
	position: fixed;
	width: 40%;
	z-index: ${zindex('add-container')};

	&:before {
		content: '';
		background: linear-gradient(180deg, rgba(20, 20, 20, 0) 0%, rgba(20, 20, 20, 1) 100%);
		height: 4rem;
		position: absolute;
		pointer-events: none;
		top: -4rem;
		width: 100%;
	}

	${Button} {
		right: auto !important;
		margin: 0.75rem;
		position: relative !important;
	}
`;
