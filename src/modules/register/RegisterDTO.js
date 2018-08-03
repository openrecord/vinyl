export default class RegisterDTO {
	constructor(username, email, password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	static fromFormElement(formElement) {
		const values = ['username', 'email', 'password'].map(field => formElement[field].value);
		return new this(...values);
	}
}
