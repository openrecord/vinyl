import React from 'react';
import styled from 'styled-components';

import RegisterForm from './RegisterForm';

export default function Register(props) {
	return (
		<Container>
			<h2>Register</h2>
			<RegisterForm submitRegister={props.submitRegister} />
		</Container>
	);
}

const Container = styled.main`
	text-align: center;

	> * {
		margin: 30px auto;
	}
`;
