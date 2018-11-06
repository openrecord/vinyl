const faker = require('faker');

const tutil = require('../tools/testUtils');

describe('Collections Page', () => {
	let page;

	beforeAll(async () => {
		page = await tutil.page();
	});

	afterAll(() => page.close());

	test('opens a new collection when navigated via url', async () => {
		const collection = 'test-collection-' + faker.lorem.word();

		page.goto(`${tutil.baseUrl()}/${collection}`);
		await page.waitForNavigation();

		const title = await page.$eval('h1', el => el.innerHTML);
		expect(title).toEqual('/' + collection);
	});
});
