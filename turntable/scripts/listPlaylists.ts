import {Prisma} from '../generated/prisma';
import gql from 'graphql-tag';
import {render} from 'prettyjson';

const prisma = new Prisma({
	endpoint: 'http://localhost:4466'
});

prisma.query
	.playlists(
		null,
		gql`
			{
				name
				tracks {
					info {
						title
					}
				}
			}
		`
	)
	.then(render)
	.then(console.log);
