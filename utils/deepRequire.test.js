
const deepRequire = require('./deepRequire')

describe('deepRequire', () => {

      it('should read in all JS packages from file system Synchronous', () => {
          const importedFiles = deepRequire(__dirname+"/deepRequire_test_dir");
        //  console.log(importedFiles)
          expect("bar" in importedFiles).toBeTruthy();
          expect("baz" in importedFiles).toBeFalsy();
          expect(importedFiles.foo).toEqual(require('./deepRequire_test_dir/foo'));
      })
})
