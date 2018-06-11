'use strict';
import path from 'path';
import test from 'ava';
import m from '..';

const otherName = path.join(__dirname, 'pkg.json');
const withSyntaxError = path.join(__dirname, 'syntax-error-pkg.json');
const withBOM = path.join(__dirname, 'has-bom-pkg.json');
const BOM = String.fromCharCode(0xFEFF);

test('async', async t => {
	const x = await m(otherName);
	t.is(x.name, 'unicorn');
	t.truthy(x._id);
});

test.serial('async - default filepath', async t => {
	const x = await m();
	t.is(x.name, 'read-pkg');
});

test.serial('async - reports json parse error', async t => {
	const err = await t.throws(m(withSyntaxError));

	t.is(err.name, 'JSONError');
	t.is(err.message, `Unexpected token } in JSON at position 43 while parsing near '..."version": "1.0.0",}' in ${path.join('test', 'syntax-error-pkg.json')}`);
});

test.serial('async - throws for invalid file format', async t => {
	const err = await t.throws(m(withBOM));

	t.is(err.name, 'JSONError');
	t.is(err.message.indexOf(BOM), 17);
});

test('sync', t => {
	const x = m.sync(otherName);
	t.is(x.name, 'unicorn');
	t.truthy(x._id);
});

test.serial('sync - default filepath', t => {
	const x = m.sync();
	t.is(x.name, 'read-pkg');
});

test.serial('sync - reports json parse error', t => {
	const err = t.throws(() => {
			m.sync(withSyntaxError);
	});

	t.is(err.name, 'JSONError');
	t.is(err.message, `Unexpected token } in JSON at position 43 while parsing near '..."version": "1.0.0",}' in ${path.join('test', 'syntax-error-pkg.json')}`);
});

test.serial('sync - throws for invalid file format', t => {
	const err = t.throws(() => {
			m.sync(withBOM);
	});

	t.is(err.name, 'JSONError');
	t.is(err.message.indexOf(BOM), 17);
});
