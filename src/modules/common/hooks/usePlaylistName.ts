import {matchPath} from 'react-router-dom';

import {ROUTES} from '../../routes/routes';
import useRouter from './useRouter';

export default (): string | null => {
  const {
    location: {pathname}
  } = useRouter();

  const match = matchPath<{playlist: string}>(pathname, {
    path: ROUTES.PLAYER,
    exact: true
  });
  if (match && match.params.playlist) {
    return match.params.playlist;
  }
  return null;
};
