'use strict';
const path = require('path');
const fs = require('graceful-fs');
const promisify = require('util.promisify');
const normalizePackageData = require('normalize-package-data');

const readFileAsync = promisify(fs.readFile);
const PACKAGE_FILE = 'package.json';

function packagePath(file) {
	if (!file) {
		return path.resolve('package.json');
	}

	if (path.extname(file)) {
		return file;
	}

	return path.join(file, PACKAGE_FILE);
}

module.exports = (file, normalize) => {
	if (normalize !== false) {
		return readFileAsync(packagePath(file))
			.then(data => {
				const manifest = JSON.parse(data);
				normalizePackageData(manifest);
				return manifest;
			});
	}

	return readFileAsync(packagePath(file));
};

module.exports.sync = (file, normalize) => {
	const manifest = JSON.parse(fs.readFileSync(packagePath(file), 'utf8'));

	if (normalize !== false) {
		normalizePackageData(manifest);
	}

	return manifest;
};
