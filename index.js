'use strict';
var path = require('path');
var loadJsonFile = require('load-json-file');
var normalizePackageData = require('normalize-package-data');

module.exports = function (fp, opts) {
	if (typeof fp !== 'string') {
		opts = fp;
		fp = '.';
	}

	opts = opts || {};
	fp = path.basename(fp) === 'package.json' ? fp : path.join(fp, 'package.json');

	return loadJsonFile(fp).then(function (x) {
		if (opts.normalize !== false) {
			normalizePackageData(x);
		}

		return x;
	});
};

module.exports.sync = function (fp, opts) {
	if (typeof fp !== 'string') {
		opts = fp;
		fp = '.';
	}

	opts = opts || {};
	fp = path.basename(fp) === 'package.json' ? fp : path.join(fp, 'package.json');

	var x = loadJsonFile.sync(fp);

	if (opts.normalize !== false) {
		normalizePackageData(x);
	}

	return x;
};
