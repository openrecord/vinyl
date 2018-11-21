import 'react-toastify/dist/ReactToastify.css';

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';

import ControlsContainer from '../controls/components/ControlsContainer';
import Landing from '../landing/Landing';
import Nav from '../nav/NavContainer';
import PlayerContainer from '../player/components/PlayerContainer';
import PlaylistContainer from '../playlist/components/PlaylistContainer';
import { ROUTES } from '../routes/routes';
import Router from './components/Router';
import Spinner from './components/Spinner';

export default function App() {
	return (
		<React.Suspense fallback={<Spinner />}>
			<Router>
				<div>
					<Nav />
					<Switch>
						<Route exact path={ROUTES.LANDING} component={Landing} />
						<Route path={ROUTES.PLAYER} component={PlaylistContainer} />
						<Route render={() => <div>Route does not exist!</div>} />
					</Switch>
					<ControlsContainer />
					<PlayerContainer />
					<ToastContainer
						position={toast.POSITION.BOTTOM_CENTER}
						transition={Slide}
						className="toast-container"
						toastClassName="toast"
						hideProgressBar
						closeButton={false}
						draggablePercent={60}
						autoClose={2500}
						duration={500}
					/>
				</div>
			</Router>
		</React.Suspense>
	);
}
