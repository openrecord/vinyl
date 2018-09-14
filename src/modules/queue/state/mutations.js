import gql from 'graphql-tag';
import {mod, set, toggle, updateAll, cons} from 'shades';
import {makeMutation, inspect, ifNull} from '../../common/utils';

export const toggleQueue = makeMutation(gql`
	query {
		queue @client {
			isOpen
		}
	}
`)(() => mod('queue', 'isOpen')(toggle));

export const enqueue = (_, {track}, {cache}) => {
	const query = gql`
		{
			queue @client {
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

			player @client {
				currentlyPlaying {
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

	const prev = cache.readQuery({query});
	const next = updateAll(mod('queue', 'tracks')(cons(track)), mod('player', 'currentlyPlaying')(ifNull(track)))(prev);
	cache.writeQuery({query, data: next});
	return null;
};
