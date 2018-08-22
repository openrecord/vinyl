import axios from 'axios';
import config from 'config';

export default class AuthApi {
	static client = axios.create({baseURL: config.api.baseUrl, timeout: config.api.timeout});

	/**
	 * @param {RegisterDTO} registerDto
	 * @return {Promise<object>}
	 */
	static async register(registerDto) {
		const response = await this.client.post('/auth/register', registerDto);
		return response.data;
	}

	/**
	 * @param {LoginDTO} loginDto
	 * @return {Promise<object>}
	 */
	static async login(loginDto) {
		const response = await this.client.post('/auth/token', loginDto);
		return response.data;
	}

	/**
	 * @return {Promise<object>}
	 */
	static async authenticate() {
		const response = await this.client.get('/auth/token');
		return response.data;
	}
}
