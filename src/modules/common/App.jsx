import 'react-toastify/dist/ReactToastify.css';

import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from 'react';
import {ToastContainer, toast, Bounce} from 'react-toastify';

import {ROUTES} from '../routes/routes';
import Landing from '../landing/Landing';
import Nav from '../nav/NavContainer';
import RegisterContainer from '../register/RegisterContainer';
import UniplayerContainer from '../uniplayer/components/UniplayerContainer';
import PlaylistContainer from '../playlist/components/PlaylistContainer';

export default function App() {
	return (
		<BrowserRouter>
			<div>
				<Nav />
				<Switch>
					<Route exact path={ROUTES.LANDING} component={Landing} />
					<Route exact path={ROUTES.REGISTER} component={RegisterContainer} />
					<Route path={ROUTES.PLAYER} component={PlaylistContainer} />
					<Route render={() => <div>Route does not exist!</div>} />
				</Switch>
				<UniplayerContainer />
				<ToastContainer
					position={toast.POSITION.TOP_RIGHT}
					transition={Bounce}
					className="toast-container"
					toastClassName="toast"
					hideProgressBar
					closeButton={false}
				/>
			</div>
		</BrowserRouter>
	);
}
