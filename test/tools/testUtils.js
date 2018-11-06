const util = require('util');
const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const axios = require('axios');
const config = require('config');
const dns = require('dns');
const url = require('url');

const WEBSOCKET_DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
const WEBSOCKET_FILE = path.join(WEBSOCKET_DIR, 'wsEndpoint');

module.exports.writeWebsocketEndpointFile = endpoint => {
	fs.mkdirpSync(WEBSOCKET_DIR);
	fs.writeFileSync(WEBSOCKET_FILE, endpoint);
};

module.exports.getWebsocketEndpointFromRemoteChrome = async () => {
	const endpoint = config.puppeteer.remoteChromeEndpoint;

	const chromeInfoEndpoint = await generateChromeInfoUrl(endpoint);

	console.debug(chromeInfoEndpoint);

	try {
		const {
			data: [{webSocketDebuggerUrl}]
		} = await axios.get(chromeInfoEndpoint);

		return webSocketDebuggerUrl;
	} catch (err) {
		console.error(err.message);
		throw new Error(`Could not find Chrome instance at ${endpointWithIp}`);
	}

	// Fix for https://github.com/GoogleChrome/puppeteer/issues/2242
	async function generateChromeInfoUrl(urlString) {
		const urlParsed = url.parse(urlString);
		const {address: hostIp} = await util.promisify(dns.lookup)(urlParsed.hostname);
		delete urlParsed.host;
		urlParsed.hostname = hostIp;
		urlParsed.pathname = 'json';
		return url.format(urlParsed);
	}
};

module.exports.readWebsocketEndpointFile = () => {
	const wsEndpoint = fs.readFileSync(WEBSOCKET_FILE, 'utf8');
	if (!wsEndpoint) {
		throw new Error('wsEndpoint not found');
	}
	return wsEndpoint;
};

module.exports.cleanWebsocketFile = () => {
	fs.removeSync(WEBSOCKET_DIR);
};

module.exports.page = async () => {
	return global.__BROWSER__.newPage();
};

module.exports.baseUrl = () => {
	return config.puppeteer.baseUrl;
};

module.exports.newHomepage = async () => {
	const page = await module.exports.page();
	await page.goto(module.exports.baseUrl());
	await page.waitForSelector('html');
	return page;
};

module.exports.ensureScreenshotsDir = async () => {
	try {
		await util.promisify(fs.mkdir)('test-screenshots');
	} catch (err) {
		// ignore
	}
};

module.exports.screenshot = async (page, filename) => {
	return page.screenshot({path: `test-screenshots/${filename}.png`});
};
