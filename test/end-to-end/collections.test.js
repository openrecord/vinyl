const faker = require('faker');

const tutil = require('../tools/testUtils');

const choice = arr => arr[Math.floor(Math.random() * arr.length)];

const SEL = {
  searchButton: '[data-id="show-hide-search"]',
  searchBar: '[data-id="search-bar-target"]',
  searchTrack: '[data-track-type="search"]',
  queueTrack: '[data-track-type="queue"]',
  modalOverlay: '.ReactModal__Overlay'
};
const waitForAnimation = page => page.waitFor(() => !document.querySelector('.velocity-animating'));

async function loadCollection(page, collection) {
  await page.goto(`${tutil.baseUrl()}/${collection}`);
}

async function searchFor(page, query) {
  const searchButton = await page.$(SEL.searchButton);
  searchButton.click();
  await waitForAnimation(page);
  await page.waitForSelector(SEL.searchBar);
  await page.type(SEL.searchBar, query);
}

async function addSongFromQuery(page, query) {
  await waitForAnimation(page);
  await searchFor(page, query);
  await page.waitFor(250);
  await page.waitForSelector(SEL.searchTrack);
  const track = choice(await page.$$(SEL.searchTrack));

  const trackName = await getTrackTitle(track);

  await track.click();
  await page.keyboard.press('Escape');
  await waitForAnimation(page);
  await page.waitFor(250);
  return trackName;
}

async function getQueueTrackName(page) {
  await page.waitForSelector(SEL.queueTrack);
  return page.$eval(SEL.queueTrack, getTrackTitle);
}

async function getQueueNames(page) {
  const tracks = await page.$$(SEL.queueTrack);
  return Promise.all(tracks.map(getTrackTitle));
}

async function testAddSong(page, query) {
  await page.waitForSelector(SEL.searchButton);
  const trackName = await addSongFromQuery(page, query);
  const queueName = await getQueueTrackName(page);
  expect(queueName).toEqual(trackName);
  return trackName;
}

async function testAddSongAddedToRemote(remotePage, trackName) {
  const remoteQueueName = await getQueueTrackName(remotePage);
  expect(remoteQueueName).toEqual(trackName);
}

async function testDragAndDrop(page, remotePage) {
  async function dragTracks() {
    await waitForAnimation(page);
    await page.waitFor(
      selector => document.querySelectorAll(selector).length > 1,
      {},
      SEL.queueTrack
    );
    const tracks = await page.$$(SEL.queueTrack);
    const [one, two] = await Promise.all(tracks.map(el => el.boundingBox()));

    await page.mouse.move(one.x + one.width / 2, one.y + one.height / 2);
    await page.mouse.down();
    await page.mouse.move(two.x + two.width / 2, two.y + two.height / 2 + 30, {steps: 10});
    await page.mouse.up();
  }

  await addSongFromQuery(page, 'butts');

  const [oldOne, oldTwo] = await getQueueNames(page);

  await dragTracks();
  await page.waitFor(1000);

  const [newOne, newTwo] = await getQueueNames(page);
  expect(newTwo).toEqual(oldOne);
  expect(newOne).toEqual(oldTwo);

  const [remoteOne, remoteTwo] = await getQueueNames(remotePage);

  expect(remoteTwo).toEqual(oldOne);
  expect(remoteOne).toEqual(oldTwo);
}

const getTrackTitle = dom => {
  if (dom.querySelector) {
    return dom.querySelector('h4').innerText;
  }
  return dom.$eval('h4', title => title.innerText);
};

async function testArrowKeys(page) {
  const [one, two] = await getQueueNames(page);
  await page.keyboard.press('ArrowDown');
  let focused = await page.evaluateHandle('document.activeElement');
  expect(await getTrackTitle(focused)).toBe(one);

  await page.keyboard.press('ArrowDown');
  focused = await page.evaluateHandle('document.activeElement');
  expect(await getTrackTitle(focused)).toBe(two);

  await page.keyboard.press('ArrowUp');
  focused = await page.evaluateHandle('document.activeElement');
  expect(await getTrackTitle(focused)).toBe(one);
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
      await loadCollection(page, collection);
      await loadCollection(remotePage, collection);
      await page.bringToFront();

      // Searching for a song and clicking it adds it to the queue
      const trackName = await testAddSong(page, 'song');
      console.log('Track added passed!');

      // Adding a song pushes it to all remote clients
      await testAddSongAddedToRemote(remotePage, trackName);
      console.log('Remote sync passed!');

      await testDragAndDrop(page, remotePage);
      console.log('Drag and drop passed!');

      await testArrowKeys(page);
      console.log('Arrow keys work!');
    },
    600 * 1000
  );
});
