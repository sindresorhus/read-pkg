import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readPackage, readPackageSync, parsePackage} from '../index.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rootCwd = path.join(dirname, '..');

test('async', async () => {
	const package_ = await readPackage();
	assert.strictEqual(package_.name, 'unicorn');
	assert.ok(package_._id);
});

test('async - cwd option', async () => {
	const package_ = await readPackage({cwd: rootCwd});
	assert.strictEqual(package_.name, 'read-pkg');
	assert.deepStrictEqual(
		await readPackage({cwd: pathToFileURL(rootCwd)}),
		package_,
	);
});

test('async - normalize option', async () => {
	const package_ = await readPackage({normalize: false});
	assert.strictEqual(package_.name, 'unicorn ');
});

test('sync', () => {
	const package_ = readPackageSync();
	assert.strictEqual(package_.name, 'unicorn');
	assert.ok(package_._id);
});

test('sync - cwd option', () => {
	const package_ = readPackageSync({cwd: rootCwd});
	assert.strictEqual(package_.name, 'read-pkg');
	assert.deepStrictEqual(
		readPackageSync({cwd: pathToFileURL(rootCwd)}),
		package_,
	);
});

test('sync - normalize option', () => {
	const package_ = readPackageSync({normalize: false});
	assert.strictEqual(package_.name, 'unicorn ');
});

const pkgJson = {
	name: 'unicorn ',
	version: '1.0.0',
	type: 'module',
};

test('parsePackage - json input', () => {
	const package_ = parsePackage(pkgJson);
	assert.strictEqual(package_.name, 'unicorn');
	assert.deepStrictEqual(
		readPackageSync(),
		package_,
	);
});

test('parsePackage - string input', () => {
	const package_ = parsePackage(JSON.stringify(pkgJson));
	assert.strictEqual(package_.name, 'unicorn');
	assert.deepStrictEqual(
		readPackageSync(),
		package_,
	);
});

test('parsePackage - normalize option', () => {
	const package_ = parsePackage(pkgJson, {normalize: false});
	assert.strictEqual(package_.name, 'unicorn ');
	assert.deepStrictEqual(
		readPackageSync({normalize: false}),
		package_,
	);
});

test('parsePackage - errors on invalid input', () => {
	assert.throws(
		() => parsePackage(['foo', 'bar']),
		{message: '`packageFile` should be either an `object` or a `string`.'},
	);

	assert.throws(
		() => parsePackage(null),
		{message: '`packageFile` should be either an `object` or a `string`.'},
	);

	assert.throws(
		() => parsePackage(() => ({name: 'unicorn'})),
		{message: '`packageFile` should be either an `object` or a `string`.'},
	);
});

test('parsePackage - does not modify source object', () => {
	const pkgObject = {name: 'unicorn', version: '1.0.0'};
	const package_ = parsePackage(pkgObject);

	assert.notStrictEqual(pkgObject, package_);
});
