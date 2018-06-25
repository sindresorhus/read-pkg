'use strict';
import path from 'path';
import test from 'ava';
import m from '..';

process.chdir(__dirname);

const rootCwd = path.join(__dirname, '..');

test('async', async t => {
	const x = await m();
	t.is(x.name, 'unicorn');
	t.truthy(x._id);
});

test('async - cwd option', async t => {
	const x = await m({cwd: rootCwd});
	t.is(x.name, 'read-pkg');
});

test('sync', t => {
	const x = m.sync();
	t.is(x.name, 'unicorn');
	t.truthy(x._id);
});

test('sync - cwd option', t => {
	const x = m.sync({cwd: rootCwd});
	t.is(x.name, 'read-pkg');
});
