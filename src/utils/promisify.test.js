
const promisify = require('./promisify')

describe('promisify', () => {

      it('should wrap callback function with a promise', () => {

        const obj = {
          foo:(value,callback)=>callback(null,"bar"),
          bar:(value,callback)=>callback("error"),
          skip:()=>"skipped"
        }

        const objP = promisify(obj,["skip"]);

        expect(objP.skip()).toEqual("skipped")
        expect(objP.foo(123)).resolves.toBe("bar")
        expect(objP.bar(123)).rejects.toBe("error")
      })
})
