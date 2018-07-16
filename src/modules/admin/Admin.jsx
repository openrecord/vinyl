import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import AdminRegisterForm from './AdminRegisterForm';
import AdminHealthCheck from './AdminHealthCheck';
import AdminRefreshToken from './AdminRefreshToken';

export default function Admin(props) {
	return (
		<Container>
			<h2>Admin</h2>
			<AdminRegisterForm submitRegister={props.submitRegister} />
			<AdminHealthCheck healthCheck={props.healthCheck} />
			<AdminRefreshToken refreshToken={props.refreshToken} />
		</Container>
	);
}

const Container = styled.main`
	text-align: center;

	> * {
		margin: 30px auto;
		border: 1px white solid;
		max-width: 300px;
	}
`;
