
/**
* @description Array method to remove the first occurrence of a value
*
* @method remove
* @param {Number|String} text text to lookup by
* @return {Array} an array with the removed value OR empty if value was not found
*
* @example var a = ['x','y']; a.remove('x')
*
*/
  if ( ! Array.prototype.remove) {
   Array.prototype.remove = function(val) {
     var i = this.indexOf(val);
          return i>-1 ? this.splice(i, 1) : [];
   };
 }

 module.exports = "Array.prototype.remove"
