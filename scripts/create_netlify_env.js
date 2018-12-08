const fs = require('mz/fs');

const indent = file =>
	file
		.toString()
		.split('\n')
		.map(line => '  ' + line.trim())
		.join('\n');

async function main() {
	const template = await fs.readFile('netlify.template');
	const dev = await fs.readFile('env/.dev.env');
	const staging = await fs.readFile('env/.staging.env');
	const prod = await fs.readFile('env/.prod.env');

	const file = `${template}

[build.environment]
${indent(dev)}

[context.production.environment]
${indent(prod)}

[context.develop.environment]
${indent(staging)}

[context.deploy-preview.environment]
${indent(staging)}
`;
	await fs.writeFile('netlify.toml', file);
}

main();
