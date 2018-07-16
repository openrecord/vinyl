import BaseApi from '../common/BaseApi';

export default class AuthApi extends BaseApi {
	/**
	 * @param {RegisterDTO} registerDto
	 * @return {Promise<object>}
	 */
	static async register(registerDto) {
		const response = await this.client.post('/auth/register', registerDto);
		return response.data;
	}

	/**
	 * @return {Promise<object>}
	 */
	static async refreshToken() {
		const response = await this.client.get('/auth/token');
		return response.data;
	}
}
