import errorRegister, {Authorization} from 'error-register'


describe('initialization', () => {

//+ should throw when using mergeReducers before "auto"
//++++++++++++++++++++++++++++++++++++++++++++++++++++

      it('?', () => {


const errorsAZ = ['Authorization','Range>InvalidArgument','Reference>Connection','Inter','GraphQl']

        const init = function(errorsA) {

          let errors = errorRegister(errorsA);

          ['RangeError','ReferenceError','SyntaxError','TypeError'].forEach(name => console.info(`-=> ${name}(message, fileName, lineNumber)`))


                    console.info(`errors 1`,new errors.Authorization("boo"));
                    console.info(`errors 2`,new Authorization("boo"));


          for(let name in errors){
            //global[`${name}Error`] = errors[name];
            console.info(`-=> ${name}Error(message, args = {}, rootCause = null)`);
          }
          console.log();
        }

init(errorsAZ)
console.info(`Authorization 3`,new Authorization("123"));
      })

})
