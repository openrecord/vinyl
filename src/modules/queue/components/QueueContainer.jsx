import React from 'react';

import {Query, Mutation} from 'react-apollo';
import Queue from './Queue';
import gql from 'graphql-tag';
import {adopt} from 'react-adopt';

const TOGGLE_QUEUE = gql`
	mutation toggleQueue {
		toggleQueue @client
	}
`;

const QUEUE_QUERY = gql`
	{
		queue @client {
			isOpen
			queue
		}
	}
`;

const Composed = adopt({
	data: ({render}) => <Query query={QUEUE_QUERY}>{({data: {queue}}) => render(queue)}</Query>,
	toggleQueue: <Mutation mutation={TOGGLE_QUEUE} />
});

export default () => (
	<Composed>{({data: {queue, isOpen}, toggleQueue}) => <Queue queue={queue} isOpen={isOpen} toggleQueue={toggleQueue} />}</Composed>
);
