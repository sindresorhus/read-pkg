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
export default function (options?: Options): Promise<PackageMetadata>;
/**
 * Returns the parsed JSON.
 */
export function sync (options?: Options): PackageMetadata;
