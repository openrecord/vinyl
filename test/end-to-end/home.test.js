const faker = require('faker');

const tutil = require('../tools/testUtils');

describe('Home Page', () => {
	let page;

	beforeAll(async () => {
		page = await tutil.newHomepage();
	});

	afterAll(() => page.close());

	test('loads correctly', async () => {
		const html = await page.$eval('h1', e => e.innerHTML);
		expect(html).toBe('Open music collections');

		await tutil.screenshot(page, 'home');
	});

	test('navigates to a collections page when a collection is entered', async () => {
		const collection = 'test-collection-' + faker.lorem.word();

		await page.waitForSelector('.hero-action');
		await page.type('#open-collection', collection);

		page.click('.hero-button');
		await page.waitForNavigation();

		await page.waitForSelector('h1');
		const title = await page.$eval('h1', el => el.innerHTML);
		expect(title).toEqual('/' + collection);

		await tutil.screenshot(page, 'home-to-collection');
	});
});
