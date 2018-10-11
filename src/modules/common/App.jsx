import 'react-toastify/dist/ReactToastify.css';

import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from 'react';
import {ToastContainer, toast, Slide} from 'react-toastify';

import {ROUTES} from '../routes/routes';
import Landing from '../landing/Landing';
import Nav from '../nav/NavContainer';
import RegisterContainer from '../register/RegisterContainer';
import ControlsContainer from '../controls/components/ControlsContainer';
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
				<ControlsContainer />
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
		</BrowserRouter>
	);
}
