const tutil = require('../tools/testUtils');

describe('Collections Page', () => {
	let page;

	beforeAll(async () => {
		page = await tutil.newHomepage();
	});

	afterAll(() => page.close());

	test('loads correctly', async () => {
		await page.screenshot({path: 'test-screenshots/screenshot-home.png'});

		const html = await page.$eval('h1', e => e.innerHTML);
		expect(html).toBe('Open music collections');
	});
});
