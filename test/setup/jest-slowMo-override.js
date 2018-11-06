const config = require('config');

const slowMoMillis = config.puppeteer.slowMoMillis;
if (slowMoMillis) {
	const timeout = 10 * 60 * 1000;
	console.warn('Overriding jest timeout due to puppeteer slowdown.', {slowMoMillis});
	jest.setTimeout(timeout);
}
