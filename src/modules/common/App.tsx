import 'react-toastify/dist/ReactToastify.css';

import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Slide, toast, ToastContainer} from 'react-toastify';

import Landing from '../landing/Landing';
import Nav from '../nav/NavContainer';
import PlaylistContainer from '../playlist/components/PlaylistContainer';
import {ROUTES} from '../routes/routes';
import Router from './components/Router';
import Spinner from './components/Spinner';

export default function App() {
  return (
    <Router>
      <div>
        <Nav />
        <React.Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route path={ROUTES.PLAYER} component={PlaylistContainer} />
            <Route render={() => <div>Route does not exist!</div>} />
          </Switch>
        </React.Suspense>
        <ToastContainer
          position={toast.POSITION.BOTTOM_CENTER}
          transition={Slide}
          className="toast-container"
          toastClassName="toast"
          hideProgressBar
          closeButton={false}
          draggablePercent={60}
          autoClose={2500}
        />
      </div>
    </Router>
  );
}
