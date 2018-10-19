import { expectType } from 'tsd-check';
import readPkg from '.';
import { IPackage } from '.';

(async () => {
	expectType<IPackage>(await readPkg());
	expectType<IPackage>(await readPkg({ cwd: './', normalize: false }));

	expectType<IPackage>(readPkg.sync());
	expectType<IPackage>(readPkg.sync({ cwd: './', normalize: false }));
})();
