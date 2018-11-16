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
				{isSearchOpen ? (
					'Hide Search'
				) : (
					<>
						Add Song
						<span> +</span>
					</>
				)}
			</Button>
		</AddContainer>
	);
}

const AddContainer = styled.div`
	bottom: 1rem;
	position: fixed;
	z-index: ${zindex('add-container')};
`;
