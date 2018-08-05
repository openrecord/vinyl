import './landing.scss';

import React from 'react';
import styled from 'styled-components';

export default class Landing extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="landing-inner">
				<h1>Listen</h1>
				<div id="c1" onClick={this.props.closeLanding} />
				<div id="c2" />
				<div id="c3" />
				<div id="c4" />
				<div id="c5" />
				<div id="c6" />
			</div>
		);
	}
}
