import React from 'react';
import styled from 'styled-components';

export default function Positioning({isSearchOpen, children}) {
	if (isSearchOpen) {
		return <FullScreen>{children}</FullScreen>;
	}

	return <Sidebar>{children}</Sidebar>;
}

const Sidebar = styled.div`
	position: fixed;
	bottom: 1rem;
	right: 2.625rem;
	width: 20rem;
`;

const FullScreen = styled.div`
	background: white;
	position: fixed;
	top: 1rem;
	bottom: 1rem;
	left: 1rem;
	right: 1rem;
	padding-top: 3rem;
`;
