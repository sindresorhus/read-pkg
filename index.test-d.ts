import {expectType, expectError} from 'tsd';
import readPkg = require('.');

const options: readPkg.Options = {};
expectError<readPkg.NormalizedPackageJson>({});
expectType<readPkg.PackageJson>({});

expectType<Promise<readPkg.NormalizedPackageJson>>(readPkg());
expectType<Promise<readPkg.NormalizedPackageJson>>(readPkg({normalize: true}));
expectType<Promise<readPkg.PackageJson>>(readPkg({normalize: false}));
expectError<Promise<readPkg.NormalizedPackageJson>>(
	readPkg({normalize: false})
);
expectType<Promise<readPkg.PackageJson>>(readPkg({cwd: '.'}));

expectType<readPkg.NormalizedPackageJson>(readPkg.sync());
expectType<readPkg.NormalizedPackageJson>(readPkg.sync({normalize: true}));
expectType<readPkg.PackageJson>(readPkg.sync({normalize: false}));
expectError<readPkg.NormalizedPackageJson>(readPkg.sync({normalize: false}));
expectType<readPkg.PackageJson>(readPkg.sync({cwd: '.'}));
