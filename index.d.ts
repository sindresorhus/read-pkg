import type {PackageJson as typeFestPackageJson} from 'type-fest';
import type {Package as normalizePackage} from 'normalize-package-data';

export type Options = {
	/**
	Current working directory.

	@default process.cwd()
	*/
	readonly cwd?: URL | string;

	/**
	[Normalize](https://github.com/npm/normalize-package-data#what-normalization-currently-entails) the package data.

	@default true
	*/
	readonly normalize?: boolean;
};

export type NormalizeOptions = {
	readonly normalize?: true;
} & Options;

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type NormalizedPackageJson = PackageJson & normalizePackage;
export type PackageJson = typeFestPackageJson;

/**
@returns The parsed JSON.

@example
```
import {readPackage} from 'read-pkg';

console.log(await readPackage());
//=> {name: 'read-pkg', …}

console.log(await readPackage({cwd: 'some-other-directory'});
//=> {name: 'unicorn', …}
```
*/
export function readPackage(options?: NormalizeOptions): Promise<NormalizedPackageJson>;
export function readPackage(options: Options): Promise<PackageJson>;

/**
@returns The parsed JSON.

@example
```
import {readPackageSync} from 'read-pkg';

console.log(readPackageSync());
//=> {name: 'read-pkg', …}

console.log(readPackageSync({cwd: 'some-other-directory'});
//=> {name: 'unicorn', …}
```
*/
export function readPackageSync(options?: NormalizeOptions): NormalizedPackageJson;
export function readPackageSync(options: Options): PackageJson;
