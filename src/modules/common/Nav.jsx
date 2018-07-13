import React from 'react';
import {string, object} from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default class Nav extends React.Component {
	static propTypes = {
		user: object
	};

	render() {
		const NavContainer = styled.nav`
			text-align: center;

			a {
				padding: 0 5px;
			}
		`;

		return <NavContainer>{this._renderLinks()}</NavContainer>;
	}

	_renderLinks() {
		return [...this._standardLinks(), ...this._authLinks()];
	}

	_standardLinks() {
		return [
			<Link to={'/'} key={'home'}>
				Home
			</Link>,
			<Link to={'/health'} key={'health'}>
				Health
			</Link>
		];
	}

	_authLinks() {
		if (this.props.user) {
			return [
				<Link to={'/account'} key={'account'}>
					My Account
				</Link>
			];
		} else {
			return [
				<Link to={'/register'} key={'register'}>
					Register
				</Link>,
				<Link to={'/login'} key={'login'}>
					Login
				</Link>
			];
		}
	}
}
