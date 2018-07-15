import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import RegisterDTO from './RegisterDTO';

export default function Register(props) {
	return (
		<div>
			<RegisterFormContainer>
				<RegisterForm submitRegister={props.submitRegister} />
			</RegisterFormContainer>
		</div>
	);
}

const RegisterFormContainer = styled.main`
	background: #08368D;
	position: absolute;
	text-align: center;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	z-index: 5;
`;

const CheckBoxWrapper = styled.div`
	white-space: nowrap;
	padding: 10px 0;
`;

function Input(props) {
	return (
		<div>
			<label htmlFor={props.name}>{props.name}</label>
			<input type={props.type} name={props.name} id={props.name} autoComplete={props.autoComplete} />
		</div>
	);
}

class RegisterForm extends React.Component {
	render() {
		const Form = styled.form`
			left: 50%;
			position: absolute;
			text-align: left;
			top: 50%;
			transform: translate(-50%, -50%);

			label {
				color: white;
				font-size: 42px;
			}

			input {
				&[type='text'],
				&[type='email'],
				&[type='password'] {
					background: none;
					border: none;
					border-bottom: 4px solid white;
					display: block;
					font-size: 42px;
					line-height: 42px;
					outline: none;
					padding: 32px 0;
					width: 545px;
				}
			}

			input[type='checkbox'] {
				margin: 0 8px 0 0;
			}
		`;

		return (
			<Form onSubmit={this.submit}>
				<Input type={'text'} name={"What's your name?"} autoComplete={'given-name'} />
				<Input type={'email'} name={"What's your email?"} autoComplete={'email'} />
				<PasswordInput />

				<button type={'submit'}>Continue</button>

				<CheckBoxWrapper>
					<input type={'checkbox'} name={'terms'} id={'terms'} />
					<label htmlFor="terms">
						I agree to the <a href="#">Terms of Use</a>
					</label>
				</CheckBoxWrapper>
			</Form>
		);
	}

	submit = e => {
		e.preventDefault();
		e.stopPropagation();
		const registerDto = RegisterDTO.fromFormElement(e.target);
		this.props.submitRegister(registerDto);
	};
}

class PasswordInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			showPassword: false
		};
	}

	render() {
		return (
			<div>
				<label htmlFor={'password'}>Create your password</label>
				<input
					type={this.state.showPassword ? 'text' : 'password'}
					name={'password'}
					id={'password'}
					autoComplete={'current-password'}
					value={this.state.password}
					onChange={this.passwordChanged}
				/>

				<CheckBoxWrapper>
					<input
						type={'checkbox'}
						name={'showPassword'}
						id={'showPassword'}
						checked={this.state.showPassword}
						onChange={this.showPassword}
					/>
					<label htmlFor={'showPassword'}>Show Password</label>{' '}
				</CheckBoxWrapper>
			</div>
		);
	}

	showPassword = e => {
		this.setState({
			showPassword: !this.state.showPassword
		});
	};

	passwordChanged = e => {
		this.setState({
			password: e.target.value
		});
	};
}
