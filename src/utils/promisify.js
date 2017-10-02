"use strict";

module.exports = function (target, skip){

    skip = skip || []

    const wrappedTarget = {};

    for (const key in target) {

      if (target.hasOwnProperty(key)
      && ! skip.includes(key)
      && "function" === typeof target[key] ) {// dont touch the prototype

        const innerFn = target[key];
        wrappedTarget[key] = function(){
          if(arguments.length === innerFn.length - 1){
            return new Promise((resolve, reject)=>{
                  innerFn.apply(innerFn,[].slice.call(arguments).concat((err,data)=>{
                    if(err) reject(err);
                    else resolve(data||true)
                  }))// end apply
                }) // end Promise
          } else {
            innerFn.apply(innerFn,[].slice.call(arguments))
          }// end if else
        } // new function
      } // end if hasOwnProperty
    } // end for

    return Object.assign({},target,wrappedTarget);
}
