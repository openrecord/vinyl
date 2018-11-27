import * as React from 'react';

import { useStore } from '../store';
import Nav from './Nav';

export default function NavContainer() {
	const {
		state: {
			player: {expanded}
		}
	} = useStore();

	return <Nav expanded={expanded} />;
}
