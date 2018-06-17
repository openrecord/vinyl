import React from 'react';
import * as Redux from 'react-redux';

import RegisterForm from './RegisterForm.jsx';
import RegisterSuccess from './RegisterSuccess.jsx';

class RegisterContainer extends React.Component {
	render() {
		return this.props.auth.user ? <RegisterSuccess /> : <RegisterForm />;
	}
}

function mapStateToProps(state, props) {
	return {
		auth: state.auth
	};
}

export default Redux.connect(mapStateToProps)(RegisterContainer);
