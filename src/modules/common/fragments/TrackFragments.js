import gql from 'graphql-tag';

export default {
	all: gql`
		fragment AllTrack on Track {
			id
			info {
				id
				thumbnail
				title
				description
				url
				source
			}
		}
	`
};
