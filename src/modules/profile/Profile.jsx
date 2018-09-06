import React from 'react';

import styled from 'styled-components';
import Collections from './Collections';

export default function Profile({user}) {
	return (
		<ProfileOuter>
			<h2>superluckyland</h2>
			<ViewSwitch>
				<span className="active">Collections</span>
				<span>Tracks</span>
			</ViewSwitch>
			<Collections />
		</ProfileOuter>
	);
}

const ProfileOuter = styled.div`
	position: relative;
	max-width: 64rem;
	margin: 1.5rem auto;
	text-align: center;
	width: 100%;
	z-index: 10;

	h2 {
		display: block;
		margin: 0 auto;
		text-align: center;
		color: white;
	}
`;

const ViewSwitch = styled.div`
	display: block;
	margin: 1rem auto;

	span {
		color: white;
		cursor: pointer;
		padding: 0.5rem;

		&:hover {
			text-decoration: underline;
		}

		&.active {
			color: #9c4d9d;
		}
	}
`;
