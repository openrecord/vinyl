import React from 'react';

import {Query, Mutation} from 'react-apollo';
import Queue from './Queue';
import gql from 'graphql-tag';
import {adopt} from 'react-adopt';

const TOGGLE_QUEUE = gql`
	mutation ToggleQueue {
		toggleQueue @client
	}
`;

const QUEUE_QUERY = gql`
	query Queue {
		queue @client {
			isOpen
			tracks {
				id {
					videoId
				}
				snippet {
					title
					thumbnails {
						high {
							url
						}
						default {
							url
						}
					}
				}
			}
		}
	}
`;

const Composed = adopt({
	queue: ({render}) => <Query query={QUEUE_QUERY}>{({data: {queue}}) => render(queue)}</Query>,
	toggleQueue: <Mutation mutation={TOGGLE_QUEUE} />
});

export default () => <Composed>{({queue, toggleQueue}) => <Queue {...queue} toggleQueue={toggleQueue} />}</Composed>;
