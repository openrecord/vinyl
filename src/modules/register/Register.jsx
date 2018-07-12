import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import RegisterDTO from './RegisterDTO';

export default function Register(props) {
	return (
		<div>
			<RegisterFormContainer>
				<h2>Register</h2>
				<RegisterForm submitRegister={props.submitRegister} />
			</RegisterFormContainer>
		</div>
	);
}

const RegisterFormContainer = styled.main`
	text-align: center;

	> * {
		margin: 30px auto;
	}
`;

const CheckBoxWrapper = styled.div`
	white-space: nowrap;
	padding: 10px 0;
`;

function Input(props) {
	return (
		<div>
			<label htmlFor={props.name}>{_.startCase(props.name)}</label>
			<input type={props.type} name={props.name} id={props.name} autoComplete={props.autoComplete} />
		</div>
	);
}

class RegisterForm extends React.Component {
	render() {
		const Form = styled.form`
			display: flex;
			flex-direction: column;
			max-width: 300px;
			text-align: left;

			border: 1px white solid;
			padding: 15px;

			label {
				font-size: 14px;
				padding: 15px 0 2px 0;
			}

			input {
				&[type='text'],
				&[type='email'],
				&[type='password'] {
					font-size: 14px;
					padding: 6px;
					display: block;
				}
			}

			input[type='checkbox'] {
				margin: 0 8px 0 0;
			}
		`;

		return (
			<Form onSubmit={this.submit}>
				<Input type={'text'} name={'firstName'} autoComplete={'given-name'} />
				<Input type={'text'} name={'lastName'} autoComplete={'family-name'} />
				<Input type={'email'} name={'email'} autoComplete={'email'} />
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
				<label htmlFor={'password'}>Password</label>
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
