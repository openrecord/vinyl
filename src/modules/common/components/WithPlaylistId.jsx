import {matchPath, withRouter} from 'react-router-dom';
import {ROUTES} from '../../routes/routes';

function WithPlaylistId({children, location: {pathname}}) {
	const {
		params: {playlist}
	} = matchPath(pathname, {
		path: ROUTES.PLAYER,
		exact: true
	});
	return children(playlist);
}

export default withRouter(WithPlaylistId);
