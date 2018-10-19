export interface IOptions {
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

export interface IPackage {
	[key: string]: any;
}

/**
 * Returns a `Promise` for the parsed JSON.
 */
declare function readPkg(options?: IOptions): Promise<IPackage>;

declare namespace readPkg {
	/**
	 * Returns the parsed JSON.
	 */
	function sync(options?: IOptions): IPackage;
}

export default readPkg;
