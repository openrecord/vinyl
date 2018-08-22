export default class LoginDTO {
	constructor(email, password) {
		this.email = email;
		this.password = password;
	}

	static fromFormElement(formElement) {
		const values = ['email', 'password'].map(field => formElement[field].value);
		return new this(...values);
	}
}
