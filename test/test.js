import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
import test from 'ava';
import {readPackage, readPackageSync, parsePackage} from '../index.js';

const dirname = path.dirname(fileURLToPath(test.meta.file));
const rootCwd = path.join(dirname, '..');

test('async', async t => {
	const package_ = await readPackage();
	t.is(package_.name, 'unicorn');
	t.truthy(package_._id);
});

test('async - cwd option', async t => {
	const package_ = await readPackage({cwd: rootCwd});
	t.is(package_.name, 'read-pkg');
	t.deepEqual(
		await readPackage({cwd: pathToFileURL(rootCwd)}),
		package_,
	);
});

test('async - normalize option', async t => {
	const package_ = await readPackage({normalize: false});
	t.is(package_.name, 'unicorn ');
});

test('sync', t => {
	const package_ = readPackageSync();
	t.is(package_.name, 'unicorn');
	t.truthy(package_._id);
});

test('sync - cwd option', t => {
	const package_ = readPackageSync({cwd: rootCwd});
	t.is(package_.name, 'read-pkg');
	t.deepEqual(
		readPackageSync({cwd: pathToFileURL(rootCwd)}),
		package_,
	);
});

test('sync - normalize option', t => {
	const package_ = readPackageSync({normalize: false});
	t.is(package_.name, 'unicorn ');
});

const pkgJson = {
	name: 'unicorn ',
	version: '1.0.0',
	type: 'module',
};

test('parsePackage - json input', t => {
	const package_ = parsePackage(pkgJson);
	t.is(package_.name, 'unicorn');
	t.deepEqual(
		readPackageSync(),
		package_,
	);
});

test('parsePackage - string input', t => {
	const package_ = parsePackage(JSON.stringify(pkgJson));
	t.is(package_.name, 'unicorn');
	t.deepEqual(
		readPackageSync(),
		package_,
	);
});

test('parsePackage - normalize option', t => {
	const package_ = parsePackage(pkgJson, {normalize: false});
	t.is(package_.name, 'unicorn ');
	t.deepEqual(
		readPackageSync({normalize: false}),
		package_,
	);
});

test('parsePackage - errors on invalid input', t => {
	t.throws(
		() => parsePackage(['foo', 'bar']),
		{message: '`packageFile` should be either an `object` or a `string`.'},
	);

	t.throws(
		() => parsePackage(null),
		{message: '`packageFile` should be either an `object` or a `string`.'},
	);

	t.throws(
		() => parsePackage(() => ({name: 'unicorn'})),
		{message: '`packageFile` should be either an `object` or a `string`.'},
	);
});

test('parsePackage - does not modify source object', t => {
	const pkgObject = {name: 'unicorn', version: '1.0.0'};
	const package_ = parsePackage(pkgObject);

	t.not(pkgObject, package_);
});
