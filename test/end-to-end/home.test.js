const tutil = require('../tools/testUtils');

describe('Home Page Tests', () => {
	let page;

	beforeAll(async () => {
		page = await tutil.newHomepage();
	});

	afterAll(() => page.close());

	it('Test Home', async () => {
		await page.screenshot({path: 'test-screenshots/screenshot-home.png'});

		const html = await page.$eval('h1', e => e.innerHTML);
		expect(html).toBe('Open music collections');
	});
});
