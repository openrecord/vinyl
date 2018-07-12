import axios from 'axios';
import config from 'config';

export default class HealthApi {
	static client = axios.create({baseURL: config.api.baseUrl, timeout: config.api.timeout});

	/**
	 * @param {RegisterDTO} registerDto
	 * @return {Promise<object>}
	 */
	static async register(registerDto) {
		const response = await this.client.post('/auth/register', registerDto);
		return response.data;
	}
}
