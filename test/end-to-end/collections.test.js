const faker = require('faker');

const tutil = require('../tools/testUtils');

const id = a => a;

const SEL = {
	searchButton: '[data-id="show-hide-search"]',
	searchBar: '[data-id="search-bar-target"]',
	searchTrack: '[data-track-type="search"]',
	queueTrack: '[data-track-type="queue"]'
};

async function loadCollection(page, collection) {
	page.goto(`${tutil.baseUrl()}/${collection}`);

	await page.waitForNavigation();
	await page.waitForSelector('h1');
}

async function checkHasHeader(page, collection) {
	const title = await page.$eval('h1', el => el.innerHTML);
	expect(title).toEqual('/' + collection);
}

async function searchFor(page, query) {
	const searchButton = await page.$(SEL.searchButton);
	searchButton.click();
	await page.waitForSelector(SEL.searchBar);
	await page.type(SEL.searchBar, query);
}

async function addSongFromQuery(page, query) {
	await searchFor(page, query);
	await page.waitForSelector(SEL.searchTrack);
	const trackName = await page.$eval(`${SEL.searchTrack} > h4`, track => track.innerText);

	await page.click(SEL.searchTrack);
	return trackName;
}

async function getQueueTrackName(page) {
	await page.waitForSelector(SEL.queueTrack);
	return page.$eval(`${SEL.queueTrack} > h4`, el => el.innerText);
}
describe('Collections Page', () => {
	let page;
	let remotePage;

	const collection = faker.lorem.word();

	beforeAll(async () => {
		page = await tutil.page();
		remotePage = await tutil.page();
	});

	afterAll(() => page.close());

	// Because jest doesn't allow any sort of ordering of tests, there's no way for us to
	// break our integration tests into multiple tests, so we're stuck putting everyting into
	// one test
	test(
		'everything',
		async () => {
			await Promise.all([loadCollection(page, collection), loadCollection(remotePage, collection)]);
			await page.bringToFront();
			await checkHasHeader(page, collection);
			console.log('has header passed!');

			// Searching for a song and clicking it adds it to the queue
			const trackName = await addSongFromQuery(page, 'song');
			const queueName = await getQueueTrackName(page);
			expect(queueName).toEqual(trackName);
			console.log('Track added passed!');

			// Adding a song pushes it to all remote clients
			const remoteQueueName = await getQueueTrackName(remotePage);
			expect(remoteQueueName).toEqual(trackName);
			console.log('Remote sync passed!');
		},
		30 * 1000
	);
});
