import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

import RegisterDTO from './RegisterDTO';

export default function Register(props) {
	return (
		<div>
			<RegisterFormContainer>
				<Link id="home-x" to={'/'}><span/></Link>
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


	#home-x{
		left: 36px;
		position: absolute;
		top: 36px;
		z-index: 10;

		&:hover{
			span{
				opacity: 1;
			}
		}

		span{
			display: block;
			height: 40px;
			padding: 10px;
			opacity: 0.5;
			width: 40px;

			&::before{
				background: white;
				content: '';
				position: absolute;
				height: 52px;
				margin-left: -2px;
				top: 5px;
				transform: rotate(45deg);
				width: 4px;
			}

			&::after{
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

	&.password-toggle{
		height: 24px
		position: absolute;
		right: 0;
		top: 40px

	}
`;

	const Form = styled.form`
		left: 50%;
		position: absolute;
		text-align: left;
		top: 50%;
		transform: translate(-50%, -50%);

		.input-container{
			display: none;

			&.active{
				display: block;
			}

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
				margin: 0;
			}
		}

		.step, button{
			background: none;
			border: 2px solid white;
			color: white;
			cursor: pointer;
			display: none;
			font-size: 20px;
			margin-top: 24px;
			outline: none;
			padding: 8px 16px;

			&:hover{
				background: white;
				color: #08368D;
			}

			&.show-submit{
				display: inline-block;
				float: right;
			}
			&.show-next{
				display: inline-block;
				float: right;
			}
			&.show-back{
				display: inline-block;
			}
		}
	`;

function Input(props) {
	return (
		<div className={'input-container' + props.class}>
			<label htmlFor={props.name}>{props.name}</label>
			<input type={props.type} name={props.name} id={props.name} autoComplete={props.autoComplete} />
		</div>
	);
}



class RegisterForm extends React.Component {
	constructor(props) {
		super(props);

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

	//Progress Through Input Active States
	showNext = () => {
		if(this.state.nameActive){
			this.setState({
				nameActive: false,
				emailActive: true
			});
		} else if(this.state.emailActive){
			this.setState({
				emailActive: false,
				passwordActive: true
			});
		}
	};

	goBack= () => {
		if(this.state.emailActive){
			this.setState({
				nameActive: true,
				emailActive: false
			});
		} else if(this.state.passwordActive){
			this.setState({
				emailActive: true,
				passwordActive: false
			});
		}
	};

	// Password Show / Hide
	showPassword = e => {
		this.setState({
			showPassword: !this.state.showPassword
		});
	};

	nameChanged = e => {
		this.setState({
			name: e.target.value
		});
	};

	emailChanged = e => {
		this.setState({
			name: e.target.value
		});
	};

	passwordChanged = e => {
		this.setState({
			password: e.target.value
		});
	};

	render() {

		var status = {};
		if (this.state.nameActive){status.name = ' active';}	else {status.name = '';}
		if (this.state.emailActive){status.email = ' active';} else {status.email = '';}
		if (this.state.passwordActive){status.password = ' active'; status.submit = ' show-submit'} else {status.password = ''; status.submit = ''}
		if (this.state.nameActive || this.state.emailActive){status.next = ' show-next'} else{status.next = ''}
		if (this.state.emailActive || this.state.passwordActive){status.back = ' show-back'} else{status.back = ''}
		return (
			<Form onSubmit={this.submit}>
				<Input component={this.renderInput} class={status.name}type={'text'} name={"What's your name?"} autoComplete={'given-name'} />
				<Input component={this.renderInput} class={status.email} type={'email'} name={"What's your email?"} autoComplete={'email'} />

				<div className={'input-container' + status.password}>
					<label htmlFor={'password'}>Create your password</label>
					<input
						type={this.state.showPassword ? 'text' : 'password'}
						name={'password'}
						id={'password'}
						autoComplete={'current-password'}
						value={this.state.password}
						onChange={this.passwordChanged}
					/>

				<CheckBoxWrapper className="password-toggle">
						<input
							type={'checkbox'}
							name={'showPassword'}
							id={'showPassword'}
							checked={this.state.showPassword}
							onChange={this.showPassword}
						/>
					</CheckBoxWrapper>
				</div>

				<div className={'step' + status.back} onClick={this.goBack}>Back</div>
				<div className={'step' + status.next} onClick={this.showNext}>Next</div>
				<button className={status.submit} type={'submit'}>Submit</button>

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
		const registerDto = RegisterDTO.fromFormElement(e.target);
		this.props.submitRegister(registerDto);
	};
}
