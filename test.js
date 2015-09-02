'use strict';
var path = require('path');
var test = require('ava');
var fn = require('./');
var fixture = path.join(__dirname, 'package.json');

test('async', function (t) {
	return fn(fixture).then(function (x) {
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
	var x = fn.sync(fixture);
	t.is(x.name, 'read-pkg');
	t.assert(x._id);
	t.end();
});

test('sync - default filepath', function (t) {
	var x = fn.sync(fixture);
	t.is(x.name, 'read-pkg');
	t.end();
});
