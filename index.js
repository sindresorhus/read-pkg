'use strict';
const path = require('path');
const fs = require('fs');
const promisify = require('util.promisify');
const parseJson = require('parse-json');
const normalizePackageData = require('normalize-package-data');

const readFileAsync = promisify(fs.readFile);
const CWD = process.cwd();
const PACKAGE_FILE = 'package.json';

function readPackage(filename, normalize, contents) {
	const manifest = parseJson(contents, path.relative(CWD, filename));

	if (normalize) {
		normalizePackageData(manifest);
	}

	return manifest;
}

module.exports = (filename = path.resolve(PACKAGE_FILE), normalize = true) => {
	return readFileAsync(filename, 'utf8')
		.then(contents => readPackage(filename, normalize, contents));
};

module.exports.sync = (filename = path.resolve(PACKAGE_FILE), normalize = true) => {
	return readPackage(filename, normalize, fs.readFileSync(filename, 'utf8'));
};
