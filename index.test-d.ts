import {expectType, expectError, expectAssignable} from 'tsd';
import {readPackage, readPackageSync, NormalizedPackageJson, PackageJson} from './index.js';

expectError<NormalizedPackageJson>({});
expectAssignable<PackageJson>({});

expectType<Promise<NormalizedPackageJson>>(readPackage());
expectType<Promise<NormalizedPackageJson>>(readPackage({normalize: true}));
expectType<Promise<PackageJson>>(readPackage({normalize: false}));
expectError<Promise<NormalizedPackageJson>>(
	readPackage({normalize: false}),
);
expectType<Promise<NormalizedPackageJson>>(readPackage({cwd: '.'}));

expectType<NormalizedPackageJson>(readPackageSync());
expectType<NormalizedPackageJson>(readPackageSync({normalize: true}));
expectType<PackageJson>(readPackageSync({normalize: false}));
expectError<NormalizedPackageJson>(readPackageSync({normalize: false}));
expectType<NormalizedPackageJson>(readPackageSync({cwd: '.'}));
