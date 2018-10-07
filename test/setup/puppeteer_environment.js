const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');

const tutil = require('../tools/testUtils');

class PuppeteerEnvironment extends NodeEnvironment {
	async setup() {
		await super.setup();

		const wsEndpoint = tutil.readWebsocketEndpointFile();

		console.log(`Connecting to Chrome browser via websocket: ${wsEndpoint}`);
		this.global.__BROWSER__ = await puppeteer.connect({
			browserWSEndpoint: wsEndpoint
		});
	}

	async teardown() {
		super.teardown();
		return this.global.__BROWSER__.disconnect();
	}
}

module.exports = PuppeteerEnvironment;
