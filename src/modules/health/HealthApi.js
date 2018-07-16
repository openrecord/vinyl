import BaseApi from '../common/BaseApi';

export default class HealthApi extends BaseApi {
	static async getApiHealth() {
		const response = await this.client.get('/healthcheck');
		return response.data;
	}
}
