import * as React from 'react';
import Nav from './Nav';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
	query PlayerContainer {
		player @client {
			expanded
		}
	}
`;

interface $Props {
	data?: {
		player: {
			expanded: boolean;
		};
	};
}

export default function NavContainer() {
	return (
		<Query query={query}>
			{(props: $Props) => <Nav expanded={!!(props.data && props.data.player.expanded)} />}
		</Query>
	);
}
