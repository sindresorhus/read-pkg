import {expectType} from 'tsd-check';
import readPkg, {PackageMetadata} from '.';

expectType<PackageMetadata>(await readPkg());
expectType<PackageMetadata>(await readPkg({cwd: '.', normalize: false}));

expectType<PackageMetadata>(readPkg.sync());
expectType<PackageMetadata>(readPkg.sync({cwd: '.', normalize: false}));
