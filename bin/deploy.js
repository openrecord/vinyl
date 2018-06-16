#!/usr/bin/env node

const config = require('config');
const path = require('path');
const yargs = require('yargs');
const {spawn} = require('child_process');
const AWS = require('aws-sdk');

const argv = yargs
	.usage(
		'$0 [options]',
		'Deploy to S3.',
		yargs => {
			yargs
				.option('env', {
					alias: 'e',
					choices: ['staging', 'production', 'prod'],
					default: 'staging'
				})
				.coerce({
					env: val => (val === 'production' ? 'prod' : val)
				});
		},
		argv => deployEnvironment(argv.e)
	)
	.version(false)
	.help().argv;

// ------------------------------
// Command Implementations

async function deployEnvironment(env) {
	const options = _deployOptions(env);
	await deployClient(options);
	const invalidationId = await invalidateCloudfront(options);
	await waitForInvalidation(invalidationId, options.distribution);
}

/**
 * @param {DeployOptions} options
 * @return {Promise}
 */
function deployClient(options) {
	return new Promise((resolve, reject) => {
		const dist = path.resolve(__dirname, '..', 'dist');
		const remotePath = 's3://' + path.join(options.bucket, options.bucketPath);

		console.info('Deploying client.', {dist, remotePath});
		const syncProcess = spawn('aws', ['s3', 'sync', dist, remotePath]);

		syncProcess.stdout.on('data', data => {
			console.debug(data.toString());
		});

		syncProcess.stderr.on('data', data => {
			console.error(data.toString());
		});

		syncProcess.on('exit', code => {
			if (code === 0) {
				console.info('Finished S3 sync.');
				resolve();
			} else {
				console.error('Error during S3 sync.', {code});
				reject(code);
			}
		});
	});
}

/**
 * Invalidate the cloudfront distribution.
 * @async
 * @param {DeployOptions} options
 * @return {Promise.<string>} - Invalidation Id
 */
async function invalidateCloudfront(options) {
	const timestamp = `${new Date().getTime()}`;
	const params = {
		DistributionId: options.distribution,
		InvalidationBatch: {
			CallerReference: timestamp,
			Paths: {
				Quantity: 1,
				Items: ['/*']
			}
		}
	};

	console.info('Invalidating CloudFront.', {options, timestamp});
	const cloudfront = new AWS.CloudFront();
	const result = await cloudfront.createInvalidation(params).promise();
	const invalidationId = result.Id;
	const invalidationStatus = result.Status;

	return invalidationId;
}

async function waitForInvalidation(invalidationId, distribution) {
	let status = await getInvalidationStatus(invalidationId, distribution);
	process.stdout.write('Waiting for CloudFront invalidation...');
	while (status === 'InProgress') {
		await _sleep(5000);
		process.stdout.write('.');
		status = await getInvalidationStatus(invalidationId, distribution);
	}

	process.stdout.write('done.\n');

	if (status !== 'Completed') {
		throw new Error('Invalidation status not expected: ' + status);
	}
}

/**
 * @param {string} invalidationId
 * @param {string} distribution
 * @return {Promise.<string>} - Invalidation status
 */
async function getInvalidationStatus(invalidationId, distribution) {
	const params = {DistributionId: distribution, Id: invalidationId};

	const cloudfront = new AWS.CloudFront();
	const result = await cloudfront.getInvalidation(params).promise();
	const status = result.Status;

	return status;
}

/**
 * @typedef {Object} DeployOptions
 * @property {string} bucket
 * @property {string} bucketPath
 * @property {string} distribution
 *
 * @param {'production'|'staging'} env
 * @return DeployOptions
 */
function _deployOptions(env) {
	const conf = _loadConfigForNodeEnv(env);
	return {
		bucket: conf.aws.s3.bucket,
		bucketPath: conf.aws.s3.bucketPath,
		distribution: conf.aws.cloudFront.distribution
	};
}

/**
 * Overwrite the node environment used to load config. This is used when loading the config directory programmatically.
 * @param {string} nodeEnv
 * @private
 */
function _loadConfigForNodeEnv(nodeEnv) {
	if (!['staging', 'prod'].includes(nodeEnv)) {
		throw new Error('Cannot override NODE_ENV for unknown environment: ' + nodeEnv);
	}

	const NODE_ENV = process.env.NODE_ENV;
	process.env.NODE_ENV = nodeEnv;
	const configDir = path.resolve(__dirname, '..', 'config');
	const conf = config.util.loadFileConfigs(configDir);
	process.env.NODE_ENV = NODE_ENV;

	return conf;
}

function _sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
