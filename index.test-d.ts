import {expectType} from 'tsd-check';
import readPkg, {PackageMetadata, sync} from '.';

expectType<PackageMetadata>(await readPkg());
expectType<PackageMetadata>(await readPkg({cwd: '.', normalize: false}));

expectType<PackageMetadata>(sync());
expectType<PackageMetadata>(sync({cwd: '.', normalize: false}));
