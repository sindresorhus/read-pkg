export interface Options {
	/**
	 * Directory to start from.
	 *
	 * @default process.cwd()
	 */
	cwd?: string;
	/**
	 * [Normalize](https://github.com/npm/normalize-package-data#what-normalization-currently-entails) the package data.
	 *
	 * @default true
	 */
	normalize?: boolean;
}

export interface PackageMetadata {
	[key: string]: unknown;
}

/**
 * Returns a `Promise` for the parsed JSON.
 */
declare function readPkg(options?: Options): Promise<PackageMetadata>;

declare namespace readPkg {
	/**
	 * Returns the parsed JSON.
	 */
	function sync(options?: Options): PackageMetadata;
}

export default readPkg;
