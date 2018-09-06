import React from 'react';
import styled from 'styled-components';

export default function Positioning({isSearchOpen, isQueueOpen, children}) {
	if (isSearchOpen) {
		return <FullScreen>{children}</FullScreen>;
	}

	return <Sidebar style={isQueueOpen ? {backgroundColor: '#ffffff'} : {}}>{children}</Sidebar>;
}

const Sidebar = styled.div`
	position: fixed;
	bottom: 1rem;
	height: 80%;
	max-height: 50rem;
	right: 1rem;
	overflow: hidden;
	overflow-y: scroll;
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
