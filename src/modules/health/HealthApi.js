import axios from 'axios';
import config from 'config';

export default class HealthApi {
	static client = axios.create({baseURL: config.api.baseUrl, timeout: config.api.timeout, withCredentials: true});

	static async getApiHealth() {
		const response = await this.client.get('/healthcheck');
		return response.data;
	}
}
