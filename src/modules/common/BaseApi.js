import axios from 'axios';
import config from 'config';

export default class BaseApi {
	static client = axios.create({baseURL: config.api.baseUrl, timeout: config.api.timeout, withCredentials: true});
}
