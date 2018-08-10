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

			&:focus {
				opacity: 1;
			}

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

				&:focus + label {
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

			&:focus {
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
				border: 2px solid transparent;
				box-sizing: border-box;
				display: inline-block;
				padding: 2px 8px;
				position: relative;
				right: -8px;

				&:focus {
					border: 2px solid #4d90fe;
					-webkit-box-shadow: 0px 0px 5px #4d90fe;
					box-shadow: 0px 0px 5px #4d90fe;
					color: white;
					opacity: 1;
				}
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

function Input({type, name, autoComplete, onChange, value, className = '', children}) {
	return (
		<div className={`input-container ${className}`}>
			<input autoFocus onChange={onChange} type={type} name={name} id={name} autoComplete={autoComplete} value={value} />
			<label htmlFor={name}>{name}</label>
			{children}
		</div>
	);
}

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);

		this.SCREENS = {
			USERNAME: 'username',
			EMAIL: 'email',
			PASSWORD: 'password'
		};

		this.screenOrder = [this.SCREENS.USERNAME, this.SCREENS.EMAIL, this.SCREENS.PASSWORD];

		this.nextScreen = {};
		this.prevScreen = {};

		// this.nextScreen[this.SCREENS.SCREEN_NAME] yields the next screen in the flow
		// this.prevScreen[this.SCREENS.SCREEN_NAME] yields the previous screen in the flow
		_.zip(this.screenOrder, this.screenOrder.slice(1)).forEach(([from = null, to = null]) => {
			this.nextScreen[from] = to;
			this.prevScreen[to] = from;
		});

		this.state = {
			active: this.SCREENS.USERNAME,
			username: '',
			email: '',
			password: '',
			showPassword: false
		};
	}

	handleKeyPress = e => {
		if (e.key == 'Enter' && this.getNextScreen()) {
			this.showNext();
		} else if (e.key == 'Enter' && this.state.active == this.SCREENS.PASSWORD) {
			this.submit();
		}
	};

	getNextScreen = () => this.nextScreen[this.state.active];

	getPrevScreen = () => this.prevScreen[this.state.active];

	showNext = () => {
		this.setState({active: this.getNextScreen()});
	};

	goBack = () => {
		this.setState({active: this.getPrevScreen()});
	};

	// Password Show / Hide
	togglePassword = e => {
		this.setState({
			showPassword: !this.state.showPassword
		});
	};

	onChange = field => ({target: {value}}) => {
		this.setState({
			[field]: value
		});
	};

	render() {
		const {active, showPassword} = this.state;

		const inputProps = {
			[this.SCREENS.USERNAME]: {
				type: 'text',
				name: 'Create a username',
				autoComplete: 'username',
				value: this.state.username
			},
			[this.SCREENS.EMAIL]: {
				type: 'email',
				name: "What's your email?",
				autoComplete: 'email',
				value: this.state.email
			},
			[this.SCREENS.PASSWORD]: {
				type: showPassword ? 'text' : 'password',
				name: 'Create your password',
				autoComplete: 'current-password',
				value: this.state.password,
				children: (
					<CheckBoxWrapper className="password-toggle">
						<input className="eye-toggle" type="button" name="showPassword" id="showPassword" onClick={this.togglePassword} />
					</CheckBoxWrapper>
				)
			}
		};

		return (
			<Form onSubmit={this.submit}>
				<div className="form-inner" onKeyPress={this.handleKeyPress}>
					<Input onChange={this.onChange(active)} {...inputProps[active]} key={active} />
					{this.getPrevScreen() && <div className="step show-back" onClick={this.goBack} />}
					{this.getNextScreen() ? (
						<div className="step show-next" tabIndex="0" onClick={this.showNext} />
					) : (
						<button className="show-submit" tabIndex="0" type="submit">
							Done
						</button>
					)}
				</div>

				<div className="page-numbers">
					<span>{this.screenOrder.indexOf(active) + 1}</span>
					<span className="dash" />
					<span>{this.screenOrder.length}</span>
				</div>
			</Form>
		);
	}

	submit = e => {
		e.preventDefault();
		e.stopPropagation();
		if (!this.getNextScreen()) {
			const {username, email, password} = this.state;

			const registerDto = new RegisterDTO(username, email, password);
			this.props.submitRegister(registerDto);
		}
	};
}
