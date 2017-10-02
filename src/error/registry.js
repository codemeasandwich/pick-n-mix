'use strict';
require('es6-proxy')

const ErrorStackParser = require('error-stack-parser');
/*
Object.defineProperty(exports, "__esModule", {
  value: true
});
*/
const registry = { }

function errorRegistry (errorNamesA){

  if("string" === typeof errorNamesA)
      errorNamesA = [errorNamesA]
  else if (!Array.isArray(errorNamesA))
      throw new Error(`You are trying to register with an unknown type of "${typeof errorNamesA}" in '${JSON.stringify(errorNamesA)}'`)

//=====================================================
//=============================== Loop over Error Names
//=====================================================

   return errorNamesA.reduce((errorsO, errorNameS)=>{

    let splitErrorName = errorNameS.split('>');
    let name = errorNameS;
    let prototypeName = 'Error';
    if ( 2 == splitErrorName.length) {
        name = splitErrorName[1];
        prototypeName = splitErrorName[0] + 'Error'
    } else if (2 < splitErrorName.length) {
      throw new RangeError('custom errors can only have one prototype. was passed '+splitErrorName.length+'. In:'+ errorNameS)
    }

//=====================================================
//====================================== Error function
//=====================================================

        errorsO[name] = function (message, args = {}, rootCause = null) {

//++++++++++++++++++++++++++++++++++++++++++++++ setup
//++++++++++++++++++++++++++++++++++++++++++++++++++++

            let errorO = new Error();
            let stackA = ErrorStackParser.parse(errorO);

            this.type = this.name; // 'Error' coming from Object.create(Error.prototype)

            if(rootCause){
               this.rootCause = rootCause;
               this.type = rootCause.name;
            }

            if(args){
               this.args = args;
            }

//++++++++++++++++++++++++++++++ add platform-specific
//++++++++++++++++++++++++++++++++++++++++++++++++++++

            // Node process
            if (global.process) {
              this.processId = process.pid
            }
            // SET processId
            this.setProcessId = (processId)=>{
                this.processId = processId;
                return this;
            }

            // user Agent
            if (global.navigator) {
              this.userAgent = navigator.userAgent;
            }
            // SET userAgent
            this.setUserAgent = (userAgent)=>{
                this.userAgent = userAgent;
                return this;
            }

//++++++++++++++++++++++++++++++++++++++++ error value
//++++++++++++++++++++++++++++++++++++++++++++++++++++

            this.name      = name;//stackA[0].functionName;//.split('.').pop();
            this.message   = message;
            this.fileName     = stackA[1].fileName;
            this.lineNumber   = stackA[1].lineNumber;
            this.columnNumber = stackA[1].columnNumber;
            this.functionName = stackA[1].functionName;

//++++++++++++++++++++++++++++++++++++++++ stack trace
//++++++++++++++++++++++++++++++++++++++++++++++++++++

            stackA.shift(); // remove first line

            // build stack trace string

            if (rootCause) { // if rootCause, attach stacktrack
              this.stack = rootCause.stack;
            } else {
              this.stack  = this.name + ': ' + message + '\n';
              this.stack += stackA.map(item => item.source).join('\n')
            }
//++++++++++++++++++++++++++++++++++++++++++ to string
//++++++++++++++++++++++++++++++++++++++++++++++++++++

            this.toString = () => this.stack

        } // END Error function

//=====================================================
//=============================== Error prototype setup
//=====================================================

        // Any Error type can be used and will become the default type name
        errorsO[name].prototype = Object.create(global[prototypeName].prototype);
        errorsO[name].prototype.constructor = errorsO[name];

//=====================================================
//======================================= return Errors
//=====================================================

        Object.assign(registry,{[name]:errorsO[name]})

        return errorsO;

    },{}) // END reduce
}


module.exports =  {
  get property(name) {

    if(name === "default")
      return errorRegistry

    if(!(name in registry) || "constructor" === name)
      return ()=>{}

    return registry[name]
  }
};
