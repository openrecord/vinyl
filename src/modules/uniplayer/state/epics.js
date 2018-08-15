import {debounceTime, map, flatMap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

import {getYoutubeURL} from './';
import * as playerActions from '.';

const onSearch = action$ =>
	action$.ofType(playerActions.SEARCH_CHANGED).pipe(
		debounceTime(500),
		flatMap(({payload}) => ajax(getYoutubeURL(payload))),
		map(e => e.response.items.map(({snippet}) => snippet)),
		map(playerActions.receiveResults)
	);

export default [onSearch];
