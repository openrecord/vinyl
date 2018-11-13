import * as React from 'react';

import Button from './Button';

interface $Props {
	onClick: () => void;
	isSearchOpen: boolean;
}

export default function AddSong({onClick, isSearchOpen}: $Props) {
	return (
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
	);
}
