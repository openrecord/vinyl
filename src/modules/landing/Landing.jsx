import {Link} from 'react-router-dom';
import React from 'react';

import {ROUTES} from '../routes/routes';

export default function Landing() {
	return (
		<Link className="landing-inner" to={ROUTES.PLAYER}>
			<div className="c1" />
			<div className="c2" />
			<div className="c3" />
			<div className="c4" />
			<div className="c5" />
			<div className="c6" />
			<h1>Listen</h1>
		</Link>
	);
}
