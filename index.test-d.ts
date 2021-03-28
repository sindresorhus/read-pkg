import {expectType, expectError, expectAssignable} from 'tsd';
import {readPackageAsync, readPackageSync, Options, NormalizedPackageJson, PackageJson} from './index.js';

const options: Options = {};
expectError<NormalizedPackageJson>({});
expectAssignable<PackageJson>({});

expectType<Promise<NormalizedPackageJson>>(readPackageAsync());
expectType<Promise<NormalizedPackageJson>>(readPackageAsync({normalize: true}));
expectType<Promise<PackageJson>>(readPackageAsync({normalize: false}));
expectError<Promise<NormalizedPackageJson>>(
	readPackageAsync({normalize: false})
);
expectType<Promise<NormalizedPackageJson>>(readPackageAsync({cwd: '.'}));

expectType<NormalizedPackageJson>(readPackageSync());
expectType<NormalizedPackageJson>(readPackageSync({normalize: true}));
expectType<PackageJson>(readPackageSync({normalize: false}));
expectError<NormalizedPackageJson>(readPackageSync({normalize: false}));
expectType<NormalizedPackageJson>(readPackageSync({cwd: '.'}));
