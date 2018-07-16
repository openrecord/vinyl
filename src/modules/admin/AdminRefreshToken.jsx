import React from 'react';

export default class AdminRegisterForm extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.props.refreshToken}>Refresh Token</button>
			</div>
		);
	}
}
