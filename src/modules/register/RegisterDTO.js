export default class RegisterDTO {
	constructor(firstName, lastName, email, password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}

	static fromFormElement(formElement) {
		const values = ['firstName', 'lastName', 'email', 'password'].map(field => formElement[field].value);
		return new this(...values);
	}
}
