import {matchPath, withRouter} from 'react-router-dom';
import {ROUTES} from '../../routes/routes';

function WithPlaylistId({children, location: {pathname}}) {
	const match = matchPath(pathname, {
		path: ROUTES.PLAYER,
		exact: true
	});
	if (match && match.params.playlist) {
		return children(match.params.playlist);
	}
	return null;
}

export default withRouter(WithPlaylistId);
