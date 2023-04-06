import process from 'node:process';
import fs, {promises as fsPromises} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import parseJson from 'parse-json';
import normalizePackageData from 'normalize-package-data';

const toPath = urlOrPath => urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;

const getPackagePath = cwd => {
	const packageDir = toPath(cwd) || process.cwd();
	return path.resolve(packageDir, 'package.json');
};

const _readPackage = (file, normalize) => {
	const json = typeof file === 'string'
		? parseJson(file)
		: file;

	if (normalize) {
		normalizePackageData(json);
	}

	return json;
};

export async function readPackage({cwd, normalize = true} = {}) {
	const packageFile = await fsPromises.readFile(getPackagePath(cwd), 'utf8');
	return _readPackage(packageFile, normalize);
}

export function readPackageSync({cwd, normalize = true} = {}) {
	const packageFile = fs.readFileSync(getPackagePath(cwd), 'utf8');
	return _readPackage(packageFile, normalize);
}

export function parsePackage(packageFile, {normalize = true} = {}) {
	const isObject = packageFile !== null && typeof packageFile === 'object' && !Array.isArray(packageFile);
	const isString = typeof packageFile === 'string';

	if (!isObject && !isString) {
		throw new TypeError('`packageFile` should be either an `object` or a `string`.');
	}

	// Input should not be modified - if `structuredClone` is available, do a deep clone, shallow otherwise
	const clonedPackageFile = isObject
		? (globalThis.structuredClone === undefined
			? {...packageFile}
			: structuredClone(packageFile))
		: packageFile;

	return _readPackage(clonedPackageFile, normalize);
}
