import 'es6-proxy'

import errorRegister, { A, B, C, D } from 'error-registry'

describe('initialization', () => {


        it('should be able to create a custom error', () => {

            errorRegister("Range>A");

            const err = new A("a1");

            expect(err).toBeInstanceOf(A);
            expect(err).toBeInstanceOf(Error);
            expect(err).toBeInstanceOf(RangeError);
        })

        it('should be able to create muilt-custom error', () => {

            errorRegister(["B","Reference>C"]);

            const err1 = new B("b1");

            expect(err1).toBeInstanceOf(B);
            expect(err1).toBeInstanceOf(Error);

            const err2 = new C("c1");

            expect(err2).toBeInstanceOf(C);
            expect(err2).toBeInstanceOf(Error);
            expect(err2).toBeInstanceOf(ReferenceError);
        })

        it('should return the created errors', () => {
          const result = errorRegister("Z");
          // should only return the error you want Registed
          expect(Object.keys(result)).toEqual(["Z"]);
          const err = new result.Z("zzz")
          expect(err).toBeInstanceOf(Error);
          expect(err.name).toEqual("Z");
          expect(err.message).toEqual("zzz");
          expect(!isNaN(err.processId));
          expect(err.userAgent).toContain("Node.js")
        })

})
