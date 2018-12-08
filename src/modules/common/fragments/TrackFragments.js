import gql from 'graphql-tag';

export default {
	all: gql`
		fragment AllTrack on Track {
			id
			index
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
