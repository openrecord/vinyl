import React from 'react';

export default class RegisterForm extends React.Component {
	render() {
		return (
			<form onSubmit={this._submit}>
				<input type={'text'} name={'name'} />
				<input type={'email'} name={'email'} />
				<input type={'submit'} />
			</form>
		);
	}

	_submit(e) {
	  e.preventDefault()
		console.log('asdf');
	}
}
