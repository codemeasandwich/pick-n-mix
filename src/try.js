
//=====================================================
//=========================================== polyfills
//=====================================================

const polyfills = require("./polyfill")
polyfills.list().forEach(polyfill=>console.log(polyfill))

//=====================================================
//======================================= custom errors
//=====================================================
console.log();
console.log("custom errors".FgGreenS);
console.log();
const errorRegister = require('./error/registry').default


const errorTypes = ['Authorization','Range>InvalidArgument','Reference>Connection','Inter','GraphQl']
console.log(errorRegister(errorTypes));

const InterError = require('./error/registry').Inter
console.log(new InterError("Nop!",{foo:"bar"}))

console.log();
console.log();
console.log();
//=====================================================
//======================================= custom errors
//=====================================================
/*
polyfills.forEach((x)=>{
  if(Array.isArray(x)){
    x.forEach(a=>console.log(a))
  }else{
    console.log(x)
  }
})*/
