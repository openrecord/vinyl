const config = require('config');

const tutil = require('./tools/testUtils');

module.exports = async function() {
	console.log('Tearing-down puppeteer...');

	if (!config.puppeteer.useRemoteChrome) {
		await global.__BROWSER_GLOBAL__.close();
	} else {
		// do nothing
	}

	console.log('Cleaning websocket temp file.');
	tutil.cleanWebsocketFile();
};
