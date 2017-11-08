import 'es6-proxy'

import errorRegister, { AError, BError, CError, DError } from './registry'

describe('initialization', () => {

        it('should be able to create a custom error', () => {

            errorRegister("Range>A");

            const err = new AError("a1");

            expect(err).toBeInstanceOf(AError);
            expect(err).toBeInstanceOf(Error);
            expect(err).toBeInstanceOf(RangeError);
        })

        it('should be able to create muilt-custom error', () => {

            errorRegister(["B","Reference>C"]);

            const err1 = new BError("b1");

            expect(err1).toBeInstanceOf(BError);
            expect(err1).toBeInstanceOf(Error);

            const err2 = new CError("c1");

            expect(err2).toBeInstanceOf(CError);
            expect(err2).toBeInstanceOf(Error);
            expect(err2).toBeInstanceOf(ReferenceError);
        })

        it('should return the created errors', () => {
          const result = errorRegister("ZError");
          // should only return the error you want Registed
          expect(Object.keys(result)).toEqual(["ZError"]);
          const err = new result.ZError("zzz")
          expect(err).toBeInstanceOf(Error);
          expect(err.type).toEqual("ZError");
          expect(err.name).toEqual("Error");
          expect(err.message).toEqual("zzz");
          expect(!isNaN(err.processId));
          expect(err.userAgent).toContain("Node.js")
        })

})
