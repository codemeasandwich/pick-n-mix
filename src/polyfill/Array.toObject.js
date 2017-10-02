/**
* Array method to convert into an object
*
* @method toObject
* @param {Array} keys list of attributes names
* @return {Object} array values mapped to keys
*
* @example var a = ['x','y']; a.toObject(['a','b'])
*
*/
if ( ! Array.prototype.toObject) {
   Array.prototype.toObject = function(keys){
      return this.reduce(function(prev,curr,index){ prev[keys[index]] = curr; return prev },{})
   }
}
module.exports = "Array.prototype.toObject"

/*
if ( ! Array.prototype.toOject) {
Array.prototype.toOject = function(keys){

  if(! Array.isArray(keys) && 0 < keys.length)
    throw new Error("invalid argument exception: 'toOject' requires an Array of keys to map to. was passed "+keys);

  var obj = {}

  this.forEach( (elem,index) => { obj[keys[index]] = elem; });

  return obj;
}
extesionNames.push("Array.prototype.toOject");
}
*/
