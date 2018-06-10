'use strict';
const path = require('path');
const fs = require('fs');
const promisify = require('util.promisify');
const parseJson = require('parse-json');
const normalizePackageData = require('normalize-package-data');

const readFileAsync = promisify(fs.readFile);
const PACKAGE_FILE = 'package.json';

function normalizeOptions(file = PACKAGE_FILE, options = {}) {
	const {
		cwd = '.',
		normalize = true
	} = options;

	if (typeof file === 'string') {
		return {
			normalize,
			filename: path.resolve(cwd, file)
		};
	}

	return {
		normalize,
		filename: path.resolve(cwd, PACKAGE_FILE)
	};
}

module.exports = (file, options) => {
	const {filename, normalize} = normalizeOptions(file, options);

	if (normalize) {
		return readFileAsync(filename)
			.then(data => {
				const manifest = parseJson(data);
				normalizePackageData(manifest);
				return manifest;
			});
	}

	return readFileAsync(file).then(parseJson);
};

module.exports.sync = (file, options) => {
	const {filename, normalize} = normalizeOptions(file, options);
	const manifest = parseJson(fs.readFileSync(filename, 'utf8'));

	if (normalize) {
		normalizePackageData(manifest);
	}

	return manifest;
};
