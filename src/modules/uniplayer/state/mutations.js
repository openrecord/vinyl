import _ from 'lodash';
import {set} from 'shades';
import gql from 'graphql-tag';
import {makeMutation} from '../../common/utils';

export const updateSearch = makeMutation(gql`
	query {
		player @client {
			search
		}
	}
`)(({search}) => set('player', 'search')(search));
