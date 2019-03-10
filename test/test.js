'use strict';
import path from 'path';
import test from 'ava';
import readPackage from '..';

process.chdir(__dirname);

const rootCwd = path.join(__dirname, '..');

test('async', async t => {
	const package_ = await readPackage();
	t.is(package_.name, 'unicorn');
	t.truthy(package_._id);
});

test('async - cwd option', async t => {
	const package_ = await readPackage({cwd: rootCwd});
	t.is(package_.name, 'read-pkg');
});

test('sync', t => {
	const package_ = readPackage.sync();
	t.is(package_.name, 'unicorn');
	t.truthy(package_._id);
});

test('sync - cwd option', t => {
	const package_ = readPackage.sync({cwd: rootCwd});
	t.is(package_.name, 'read-pkg');
});
