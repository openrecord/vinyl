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
				<div className="c1" onClick={this.props.closeLanding} />
				<div className="c2" />
				<div className="c3" />
				<div className="c4" />
				<div className="c5" />
				<div className="c6" />
			</div>
		);
	}
}
