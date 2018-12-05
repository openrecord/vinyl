const util = require('util');
const config = require('config');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');

const tutil = require('../tools/testUtils');

module.exports = async function() {
	await tutil.ensureScreenshotsDir();
	config.puppeteer.useRemoteChrome
		? await discoverRunningChrome()
		: await launchChromeWithPuppeteer();
};

async function discoverRunningChrome() {
	console.log(
		`Getting websocket information from running Chrome instance at ${
			config.puppeteer.remoteChromeEndpoint
		}`
	);
	const websocketEndpoint = await tutil.getWebsocketEndpointFromRemoteChrome();

	console.log('Saving websocket endpoint to file: ' + websocketEndpoint);
	tutil.writeWebsocketEndpointFile(websocketEndpoint);
}

async function launchChromeWithPuppeteer() {
	console.log('Launching Chrome with puppeteer.');
	const browser = await puppeteer.launch({
		headless: config.puppeteer.headless
	});

	/**
	 * @see https://jestjs.io/docs/en/puppeteer
	 * store the browser instance so we can teardown it later
	 * this global is only available in the teardown but not in TestEnvironments
	 */
	global.__BROWSER_GLOBAL__ = browser;

	tutil.writeWebsocketEndpointFile(browser.wsEndpoint());
}
