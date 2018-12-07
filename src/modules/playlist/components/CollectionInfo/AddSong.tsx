import * as React from 'react';

import Button from './Button';

interface $Props {
	onClick: () => void;
	isOpen: boolean;
}

export default function AddSong({onClick, isOpen}: $Props) {
	return (
		<Button onClick={onClick} data-id="show-hide-search">
			{isOpen ? 'Hide' : <>Add Song</>}
		</Button>
	);
}
