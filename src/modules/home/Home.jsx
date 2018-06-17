import React from 'react';
import styled from 'styled-components';

import UniplayerContainer from '../uniplayer/UniplayerContainer';
import Landing from '../landing/Landing.jsx';

export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showLanding: true
		};
	}

	closeLanding = () => {
		this.setState({showLanding: false});
	};

	renderLanding = () => {
		if (this.state.showLanding) {
			return <Landing closeLanding={this.closeLanding} />;
		}
	};

	render() {
		return (
			<main>
				<UniplayerContainer />
				{this.renderLanding()}
			</main>
		);
	}
}
