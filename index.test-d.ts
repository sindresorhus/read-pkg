import {expectType, expectError, expectAssignable} from 'tsd';
import {
	readPackage,
	readPackageSync,
	parsePackage,
	type NormalizedPackageJson,
	type PackageJson,
} from './index.js';

expectError<NormalizedPackageJson>({});
expectAssignable<PackageJson>({});

expectType<Promise<NormalizedPackageJson>>(readPackage());
expectType<Promise<NormalizedPackageJson>>(readPackage({normalize: true}));
expectType<Promise<PackageJson>>(readPackage({normalize: false}));
expectError<Promise<NormalizedPackageJson>>(
	readPackage({normalize: false}),
);
expectType<Promise<NormalizedPackageJson>>(readPackage({cwd: '.'}));
expectType<Promise<NormalizedPackageJson>>(readPackage({cwd: new URL('file:///path/to/cwd/')}));

expectType<NormalizedPackageJson>(readPackageSync());
expectType<NormalizedPackageJson>(readPackageSync({normalize: true}));
expectType<PackageJson>(readPackageSync({normalize: false}));
expectError<NormalizedPackageJson>(readPackageSync({normalize: false}));
expectType<NormalizedPackageJson>(readPackageSync({cwd: '.'}));
expectType<NormalizedPackageJson>(readPackageSync({cwd: new URL('file:///path/to/cwd/')}));

expectType<NormalizedPackageJson>(parsePackage(''));
expectType<NormalizedPackageJson>(parsePackage({name: 'unicorn'}));
expectType<NormalizedPackageJson>(parsePackage('', {normalize: true}));
expectType<PackageJson>(parsePackage('', {normalize: false}));
expectType<PackageJson>(parsePackage({name: 'unicorn'}, {normalize: false}));
expectError(parsePackage());
expectError<NormalizedPackageJson>(parsePackage('', {normalize: false}));
expectError(parsePackage('', {cwd: '.'}));
