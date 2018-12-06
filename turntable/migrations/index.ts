import * as path from 'path';
import {always} from 'shades';

import {Prisma} from '../generated/prisma';

const fs = require('mz/fs');
export const prisma = new Prisma({
	endpoint: process.env.ENDPOINT
});

export async function runMigration(index: number, name: string, migration: () => Promise<void>) {
	const existingMigration = await prisma.query.migration({where: {index}});
	if (existingMigration) {
		return;
	}
	await migration();
	await prisma.mutation.createMigration({data: {index, name}});
}

interface Migration {
	index: number;
	name: string;
	code: () => Promise<void>;
}

const migrationRE = /(\d{4})--(.*).js/;

const isMigration = migrationRE.test.bind(migrationRE);

const toMigration = (filename: string): Migration => {
	const [_, idx, name] = filename.match(migrationRE);
	return {
		index: parseInt(idx),
		name,
		code: require(path.resolve(__dirname, filename)).default
	};
};

const unapplied = (idx: number) => ({index}: Migration) => index > idx;

async function main() {
	const files = await fs.readdir(__dirname);
	const [lastMigration] = await prisma.query.migrations({
		where: {},
		orderBy: 'index_DESC',
		first: 1
	});

	files
		.filter(isMigration)
		.map(toMigration)
		.filter(lastMigration ? unapplied(lastMigration.index) : always(true))
		.forEach(async ({index, name, code}: Migration) => {
			await code();
			await prisma.mutation.createMigration({data: {index, name}});
			console.log(`Applied ${index}: ${name}`);
		});
}

main();
