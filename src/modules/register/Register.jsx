import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, Link} from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';
import arrow from './images/registration-arrow.svg';
import show from './images/show-icn.svg';

import RegisterDTO from './RegisterDTO';

export default function Register(props) {
	return (
		<div>
			<RegisterFormContainer>
				<Link id="home-x" to={'/'}>
					<span />
				</Link>
				<RegisterForm submitRegister={props.submitRegister} />
			</RegisterFormContainer>
		</div>
	);
}

const RegisterFormContainer = styled.main`
	background: black;
	position: absolute;
	text-align: center;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	z-index: 5;

	#home-x {
		left: 36px;
		position: absolute;
		top: 36px;
		z-index: 10;

		&:hover {
			span {
				opacity: 1;
			}
		}

		span {
			display: block;
			height: 40px;
			padding: 10px;
			opacity: 0.5;
			width: 40px;

			&::before {
				background: white;
				content: '';
				position: absolute;
				height: 52px;
				margin-left: -2px;
				top: 5px;
				transform: rotate(45deg);
				width: 4px;
			}

			&::after {
				background: white;
				content: '';
				position: absolute;
				height: 52px;
				margin-left: -2px;
				top: 5px;
				transform: rotate(-45deg);
				width: 4px;
			}
		}
	}
`;

const CheckBoxWrapper = styled.div`
	white-space: nowrap;
	padding: 10px 10px;

	&.password-toggle {
		height: 24px;
		position: absolute;
		right: 0;
		top: 40px;

		.eye-toggle {
			background: url(${show});
			background-size: 56px 33px;
			background-position: center;
			background-repeat: no-repeat;
			border: none;
			cursor: pointer;
			height: 33px;
			margin-top: 32px;
			opacity: 0.4;
			float: right;
			/*padding: 8px 0;*/
			width: 56px;

			&:hover {
				opacity: 1;
			}
		}
	}
`;

const Form = styled.form`
	background: 0;
	bottom: 0;
	left: 0;
	position: fixed;
	right: 0;
	text-align: left;
	top: 0;

	.form-inner {
		display: block;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);

		.input-container {
			display: none;

			&.active {
				display: block;
			}

			input {
				&[type='text'],
				&[type='email'],
				&[type='password'] {
					background: none;
					border: none;
					border-bottom: 4px solid white;
					color: white;
					display: block;
					font-size: 2.625em;
					line-height: 94px;
					margin-top: 48px;
					outline: none;
					width: 545px;
				}

				&:focus + label{
					opacity: 0.5;
				}
			}

			label {
				position: absolute;
				color: white;
				font-size: 2.625em;
				top: 0;
			}

		}

		.step {
			background: url(${arrow});
			background-size: 60px 26px;
			background-position: center;
			background-repeat: no-repeat;
			cursor: pointer;
			display: none;
			height: 26px;
			margin-top: 32px;
			opacity: 0.5;
			padding: 8px 0;
			width: 60px;

			&:hover {
				opacity: 1;
			}
			&.show-next {
				display: inline-block;
				float: right;
			}
			&.show-back {
				display: inline-block;
				float: left;
				transform: scale(-1);
			}
		}

		button {
			background: none;
			border: 0;
			color: white;
			cursor: pointer;
			display: none;
			float: right;
			font-size: 2.625em;
			font-weight: 700;
			margin-top: 24px;
			opacity: 0.5;
			outline: none;
			padding: 0;

			&:hover {
				opacity: 1;
			}

			&.show-submit {
				display: inline-block;
			}
		}
	}

	.page-numbers {
		bottom: 20px;
		position: fixed;
		opacity: 0.5;
		right: 20px;

		span {
			display: inline-block;
			color: white;
			font-size: 1.875em;

			&.dash {
				background: white;
				height: 2px;
				margin: 0 3px;
				position: relative;
				top: -10px;
				width: 20px;
			}
		}
	}
`;

function Input(props) {
	return (
		<div className={'input-container' + props.class}>
			<input
				onChange={props.onChange}
				type={props.type}
				name={props.name}
				id={props.name}
				autoComplete={props.autoComplete}
			/>
			<label htmlFor={props.name}>{props.name}</label>
		</div>
	);
}

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);

		this.inputs = {
			name: React.createRef(),
		  email: React.createRef(),
		  password: React.createRef(),
		}

		this.state = {
			nameActive: true,
			emailActive: false,
			passwordActive: false,
			name: '',
			email: '',
			password: '',
			showPassword: false
		};
	}

	componentWillMount() {
		window.addEventListener('keydown', this.handleKeyPress);
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyPress);
	}

	handleKeyPress = e => {
		if (e.keyCode == 13) {
			this.showNext();
			if (!this.state.passwordActive) {
				e.preventDefault();
				return false;
			}
		}
	};

	focusNameInput = () =>{
		console.log(this.inputs.name.current.focus());
	}
	focusEmailInput = () =>{
		console.log(this.inputs.email.current.focus());
	}
	focusPasswordInput= () =>{
		console.log(this.inputs.password.current.focus());
	}

	//Progress Through Input Active States
	showNext = () => {
		if (this.state.nameActive) {
			this.setState({
				nameActive: false,
				emailActive: true
			});
			this.focusEmailInput();
		} else if (this.state.emailActive) {
			this.setState({
				emailActive: false,
				passwordActive: true
			});
			this.focusPasswordInput();
		}
	};

	goBack = () => {
		if (this.state.emailActive) {
			this.setState({
				nameActive: true,
				emailActive: false
			});
			this.focusNameInput();
		} else if (this.state.passwordActive) {
			this.setState({
				emailActive: true,
				passwordActive: false
			});
			this.focusEmailInput();
		}
	};

	// Password Show / Hide
	togglePassword= e => {
		this.setState({
			showPassword: !this.state.showPassword
		});
	};

	onChange = field => ({target: { value }})  => {
  this.setState({
    [field]: value,
  })
};

	render() {
		var status = {
		  name: '',
		  email: '',
		  password: '',
			submit: '',
			next: '',
			back: ''
		}
		var page = {
				number: '',
		}
		if (this.state.nameActive) {
			status.name = ' active';
			page.number = '1';
		} else {
			status.name = '';
		}
		if (this.state.emailActive) {
			status.email = ' active';
			page.number = '2';
		} else {
			status.email = '';
		}
		if (this.state.passwordActive) {
			status.password = ' active';
			page.number = '3';
			status.submit = ' show-submit';
		} else {
			status.password = '';
			status.submit = '';
		}
		if (this.state.nameActive || this.state.emailActive) {
			status.next = ' show-next';
		} else {
			status.next = '';
		}
		if (this.state.emailActive || this.state.passwordActive) {
			status.back = ' show-back';
		} else {
			status.back = '';
		}

		return (
			<Form onSubmit={this.submit}>
				<div className="form-inner">
					<Input
						ref={this.inputs.name}
						onChange={this.onChange('name')}
						class={status.name}
						type={'text'}
						name={"What's your name?"}
						autoComplete={'given-name'}
					/>
					<Input
						ref={this.inputs.email}
						onChange={this.onChange('email')}
						class={status.email}
						type={'email'}
						name={"What's your email?"}
						autoComplete={'email'}
					/>

					<div className={'input-container' + status.password}>
						<input
							ref={this.inputs.password}
							type={this.state.showPassword ? 'text' : 'password'}
							name={'password'}
							id={'password'}
							autoComplete={'current-password'}
							value={this.state.password}
							onChange={this.onChange('password')}
						/>
						<label htmlFor={'password'}>Create your password</label>

						<CheckBoxWrapper className="password-toggle">
							<input
								className="eye-toggle"
								type={'button'}
								name={'showPassword'}
								id={'showPassword'}
								onClick={this.togglePassword}
							/>
						</CheckBoxWrapper>
					</div>

					<div className={'step' + status.back} onClick={this.goBack} />
					<div className={'step' + status.next} onClick={this.showNext} />
					<button className={status.submit} type={'submit'}>
						Done
					</button>
				</div>

				<div className="page-numbers">
					<span>{page.number}</span>
					<span className="dash" />
					<span>3</span>
				</div>

				<CheckBoxWrapper style={{display: 'none'}}>
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
		if (this.state.passwordActive) {
			const registerDto = RegisterDTO.fromFormElement(e.target);
			this.props.submitRegister(registerDto);
		}
	};
}
