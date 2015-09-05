'use strict';
var path = require('path');
var test = require('ava');
var fn = require('../');
var pkg = path.join(__dirname, '../');
var otherName = path.join(__dirname, 'pkg.json');

test('async', function (t) {
	return fn(otherName).then(function (x) {
		t.is(x.name, 'unicorn');
		t.assert(x._id);
	});
});

test('async - directory', function (t) {
	return fn(pkg).then(function (x) {
		t.is(x.name, 'read-pkg');
		t.assert(x._id);
	});
});

test('async - default filepath', function (t) {
	return fn().then(function (x) {
		t.is(x.name, 'read-pkg');
	});
});

test('sync', function (t) {
	var x = fn.sync(otherName);
	t.is(x.name, 'unicorn');
	t.assert(x._id);
	t.end();
});

test('sync - directory', function (t) {
	var x = fn.sync(pkg);
	t.is(x.name, 'read-pkg');
	t.assert(x._id);
	t.end();
});

test('sync - default filepath', function (t) {
	var x = fn.sync();
	t.is(x.name, 'read-pkg');
	t.end();
});
