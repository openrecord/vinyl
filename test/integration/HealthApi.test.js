import assert from 'assert';
import HealthApi from '../../src/modules/health/HealthApi';

describe('HealthApi', function() {
	test('get api health', async () => {
		const response = await HealthApi.getApiHealth();
		assert.notEqual(response, null);
	});
});
